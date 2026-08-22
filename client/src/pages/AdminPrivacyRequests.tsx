import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type PrivacyRequest = {
  publicId: string;
  requestType: string;
  fullName: string;
  email: string;
  phone: string | null;
  status: string;
  submittedAt: string;
  dueAt: string;
  acknowledgedAt: string | null;
  identityVerifiedAt: string | null;
  externalActionStatus: string;
  dealerNotificationStatus: string;
  dealerCount: number | null;
  completedAt: string | null;
};

type PrivacyEvent = {
  eventType: string;
  actorEmail: string;
  createdAt: string;
};

async function api(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.error?.message || `Request failed (${response.status})`);
  }
  return body;
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString() : "Not recorded";
}

const requestTypeLabels: Record<string, string> = {
  access: "Access",
  recipients: "Recipient list",
  withdrawal: "Consent withdrawal",
  deletion: "Deletion",
};

export default function AdminPrivacyRequests() {
  const { toast } = useToast();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [requests, setRequests] = useState<PrivacyRequest[]>([]);
  const [selected, setSelected] = useState<PrivacyRequest | null>(null);
  const [events, setEvents] = useState<PrivacyEvent[]>([]);
  const [evidenceIntegrity, setEvidenceIntegrity] = useState<boolean | null>(null);
  const [dealerCount, setDealerCount] = useState("0");
  const [dealerAcknowledged, setDealerAcknowledged] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((response) => setAuthed(response.ok))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) refreshList();
  }, [authed]);

  async function refreshList() {
    try {
      const body = await api("/api/admin/privacy-requests");
      setRequests(body.requests);
      if (selected) await openRequest(selected.publicId);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Login required")) {
        setAuthed(false);
      } else {
        toast({
          title: "Could not load privacy requests",
          description: error instanceof Error ? error.message : "Try again.",
          variant: "destructive",
        });
      }
    }
  }

  async function openRequest(publicId: string) {
    try {
      const body = await api(`/api/admin/privacy-requests/${encodeURIComponent(publicId)}`);
      setSelected(body.request);
      setEvents(body.events);
      setEvidenceIntegrity(body.evidenceIntegrity);
      setDealerCount(String(body.request.dealerCount ?? 0));
      setDealerAcknowledged(
        body.request.dealerNotificationStatus === "acknowledged",
      );
    } catch (error) {
      toast({
        title: "Could not open request",
        description: error instanceof Error ? error.message : "Try again.",
        variant: "destructive",
      });
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setPassword("");
      setAuthed(true);
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  async function performAction(
    action: "acknowledge" | "verify" | "fulfill" | "complete",
  ) {
    if (!selected || busy) return;
    if (
      action === "complete" &&
      !window.confirm("Confirm that the final response was delivered to the requester.")
    ) {
      return;
    }
    const parsedDealerCount = Number(dealerCount);
    if (
      action === "fulfill" &&
      (!Number.isInteger(parsedDealerCount) || parsedDealerCount < 0)
    ) {
      toast({
        title: "Enter the dealer count",
        description: "Use 0 if the lead was not sent to a dealer.",
        variant: "destructive",
      });
      return;
    }
    const dealerAcknowledgementRequired =
      action === "fulfill" &&
      (selected.requestType === "deletion" ||
        selected.requestType === "withdrawal") &&
      parsedDealerCount > 0;
    if (dealerAcknowledgementRequired && !dealerAcknowledged) {
      toast({
        title: "Dealer acknowledgement required",
        description:
          "Confirm that every dealer who received the lead acknowledged the request.",
        variant: "destructive",
      });
      return;
    }
    if (
      action === "fulfill" &&
      !window.confirm(
        "Confirm that you completed the manual lead-store steps in the MHMDA SOP.",
      )
    ) {
      return;
    }
    setBusy(true);
    try {
      await api(
        `/api/admin/privacy-requests/${encodeURIComponent(selected.publicId)}/${action}`,
        {
          method: "POST",
          body:
            action === "complete"
              ? JSON.stringify({ responseDelivered: true })
              : action === "fulfill"
                ? JSON.stringify({
                    leadStoreActionCompleted: true,
                    dealerCount: parsedDealerCount,
                    dealerAcknowledged,
                  })
                : JSON.stringify({}),
        },
      );
      toast({ title: action === "fulfill" ? "Fulfillment recorded" : "Request updated" });
      await refreshList();
    } catch (error) {
      toast({
        title: "Request update failed",
        description: error instanceof Error ? error.message : "Try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await api("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
    setSelected(null);
  }

  if (authed === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Adapy Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="privacy-admin-email">Email</Label>
                <Input
                  id="privacy-admin-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="privacy-admin-password">Password</Label>
                <Input
                  id="privacy-admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">Privacy requests</h1>
            <p className="text-sm text-muted-foreground">MHMDA operator queue</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="/admin">Blog admin</a>
            </Button>
            <Button variant="outline" onClick={handleLogout}>Sign out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Open and closed requests ({requests.length})</CardTitle>
            <Button variant="outline" size="sm" onClick={refreshList} disabled={busy}>Refresh</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {requests.length === 0 && (
              <p className="py-4 text-sm text-muted-foreground">No privacy requests yet.</p>
            )}
            {requests.map((request) => (
              <button
                key={request.publicId}
                type="button"
                onClick={() => openRequest(request.publicId)}
                className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                  selected?.publicId === request.publicId ? "border-primary bg-muted" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{request.publicId}</span>
                  <Badge variant={request.status === "completed" ? "secondary" : "default"}>
                    {request.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {requestTypeLabels[request.requestType] ?? request.requestType} · due{" "}
                  {new Date(request.dueAt).toLocaleDateString()}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selected ? selected.publicId : "Select a request"}</CardTitle>
          </CardHeader>
          <CardContent>
            {!selected ? (
              <p className="text-sm text-muted-foreground">
                Select a request to verify, fulfill, and close it.
              </p>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2 text-sm">
                  <div><span className="font-semibold">Type:</span> {requestTypeLabels[selected.requestType] ?? selected.requestType}</div>
                  <div><span className="font-semibold">Status:</span> {selected.status}</div>
                  <div><span className="font-semibold">Name:</span> {selected.fullName}</div>
                  <div><span className="font-semibold">Email:</span> {selected.email}</div>
                  <div><span className="font-semibold">Phone:</span> {selected.phone || "Not provided"}</div>
                  <div><span className="font-semibold">Due:</span> {formatDate(selected.dueAt)}</div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
                  <p><span className="font-semibold">Acknowledged:</span> {formatDate(selected.acknowledgedAt)}</p>
                  <p><span className="font-semibold">Identity verified:</span> {formatDate(selected.identityVerifiedAt)}</p>
                  <p><span className="font-semibold">Manual lead-store action:</span> {selected.externalActionStatus}</p>
                  <p><span className="font-semibold">Dealer notification:</span> {selected.dealerNotificationStatus} ({selected.dealerCount ?? "unknown"} dealers)</p>
                  <p>
                    <span className="font-semibold">Evidence integrity:</span>{" "}
                    {evidenceIntegrity === null ? "Not checked" : evidenceIntegrity ? "Valid" : "Invalid — escalate"}
                  </p>
                </div>

                {selected.status !== "completed" && (
                  <div className="flex flex-wrap gap-2">
                    {!selected.acknowledgedAt && (
                      <Button onClick={() => performAction("acknowledge")} disabled={busy}>Record acknowledgement</Button>
                    )}
                    {!selected.identityVerifiedAt && (
                      <Button onClick={() => performAction("verify")} disabled={busy}>Verify identity</Button>
                    )}
                    {selected.externalActionStatus === "completed" && selected.acknowledgedAt && (
                      <Button variant="secondary" onClick={() => performAction("complete")} disabled={busy}>
                        Confirm response and close
                      </Button>
                    )}
                  </div>
                )}

                {selected.status !== "completed" &&
                  selected.acknowledgedAt &&
                  selected.identityVerifiedAt &&
                  selected.externalActionStatus !== "completed" && (
                    <div className="space-y-4 rounded-lg border p-4">
                      <div>
                        <h2 className="font-semibold">Record manual fulfillment</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          First complete the matching lead-store, follow-up, and dealer steps in the MHMDA SOP. Do not enter health details here.
                        </p>
                      </div>
                      <div className="max-w-xs space-y-1.5">
                        <Label htmlFor="privacy-dealer-count">Dealers that received this lead</Label>
                        <Input
                          id="privacy-dealer-count"
                          type="number"
                          min="0"
                          step="1"
                          value={dealerCount}
                          onChange={(event) => setDealerCount(event.target.value)}
                        />
                      </div>
                      {(selected.requestType === "deletion" ||
                        selected.requestType === "withdrawal") &&
                        Number(dealerCount) > 0 && (
                          <label className="flex items-start gap-2 text-sm">
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4"
                              checked={dealerAcknowledged}
                              onChange={(event) =>
                                setDealerAcknowledged(event.target.checked)
                              }
                            />
                            <span>
                              Every dealer that received this lead provided written acknowledgement.
                            </span>
                          </label>
                        )}
                      <Button onClick={() => performAction("fulfill")} disabled={busy}>
                        {busy ? "Recording…" : "Confirm manual fulfillment"}
                      </Button>
                    </div>
                  )}

                <div>
                  <h2 className="mb-2 font-semibold">Evidence timeline</h2>
                  {events.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No events recorded.</p>
                  ) : (
                    <ol className="space-y-2 text-sm">
                      {events.map((event, index) => (
                        <li key={`${event.createdAt}-${index}`} className="border-l-2 border-muted pl-3">
                          <p className="font-medium">{event.eventType}</p>
                          <p className="text-muted-foreground">
                            {formatDate(event.createdAt)} · {event.actorEmail}
                          </p>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}