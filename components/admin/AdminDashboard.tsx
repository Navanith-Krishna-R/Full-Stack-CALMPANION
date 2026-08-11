'use client';

import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  Clock, CheckCircle2, XCircle, CalendarClock, Loader2, AlertTriangle, Inbox, Mail, Trash2,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';

type AppointmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

interface AdminAppointment {
  id: string;
  type: string;
  date: string;
  time: string;
  notes: string | null;
  status: AppointmentStatus;
  createdAt: string;
  user: { name: string; email: string };
}

const FILTERS: { label: string; value: AppointmentStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Rejected', value: 'REJECTED' },
];

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  ACCEPTED: 'bg-sage-100 text-sage-800 dark:bg-sage-900/50 dark:text-sage-200',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200',
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  initial: 'Initial Consultation',
  followup: 'Follow-up Session',
  urgent: 'Urgent Care',
};

export default function AdminDashboard({ adminName }: { adminName: string }) {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [filter, setFilter] = useState<AppointmentStatus | 'ALL'>('ALL');
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AdminAppointment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminAppointment | null>(null);
  const [toast, setToast] = useState<{ message: string; tone: 'success' | 'error' } | null>(null);

  const load = async () => {
    setLoadStatus('loading');
    try {
      const res = await fetch('/api/admin/appointments', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setAppointments(data.appointments ?? []);
      setLoadStatus('loaded');
    } catch {
      setLoadStatus('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const counts = useMemo(() => {
    const now = Date.now();
    return {
      pending: appointments.filter((a) => a.status === 'PENDING').length,
      accepted: appointments.filter((a) => a.status === 'ACCEPTED').length,
      rejected: appointments.filter((a) => a.status === 'REJECTED').length,
      upcoming: appointments.filter((a) => a.status === 'ACCEPTED' && new Date(a.date).getTime() >= now).length,
    };
  }, [appointments]);

  const filtered = filter === 'ALL' ? appointments : appointments.filter((a) => a.status === filter);

  const updateStatus = async (id: string, newStatus: 'ACCEPTED' | 'REJECTED') => {
    setActioningId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ message: data.message || 'Could not update appointment', tone: 'error' });
        return;
      }
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
      setToast({
        message: newStatus === 'ACCEPTED' ? 'Appointment accepted' : 'Appointment rejected',
        tone: 'success',
      });
    } catch {
      setToast({ message: 'Something went wrong. Please try again.', tone: 'error' });
    } finally {
      setActioningId(null);
      setRejectTarget(null);
    }
  };

  const deleteAppointment = async (id: string) => {
    setActioningId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ message: data.message || 'Could not delete appointment', tone: 'error' });
        return;
      }
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      setToast({ message: 'Appointment deleted', tone: 'success' });
    } catch {
      setToast({ message: 'Something went wrong. Please try again.', tone: 'error' });
    } finally {
      setActioningId(null);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">CALMPANION Admin</span>
        <h1 className="text-3xl font-display font-medium mt-2">Appointment Requests</h1>
        <p className="text-muted-foreground mt-1">Signed in as {adminName}</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Pending', value: counts.pending, icon: Clock, accent: 'text-amber-600 dark:text-amber-300' },
          { label: 'Accepted', value: counts.accepted, icon: CheckCircle2, accent: 'text-sage-700 dark:text-sage-300' },
          { label: 'Rejected', value: counts.rejected, icon: XCircle, accent: 'text-red-600 dark:text-red-300' },
          { label: 'Upcoming', value: counts.upcoming, icon: CalendarClock, accent: 'text-sky-600 dark:text-sky-300' },
        ].map((stat) => (
          <div key={stat.label} className="glow-card bg-card border border-border rounded-2xl p-5">
            <stat.icon className={`w-5 h-5 mb-3 ${stat.accent}`} />
            <div className="text-2xl font-display font-medium">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              filter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/70'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Content states */}
      {loadStatus === 'loading' && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      )}

      {loadStatus === 'error' && (
        <div className="glow-card bg-card border border-border rounded-2xl p-10 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Couldn&apos;t load appointments.</p>
          <button
            onClick={load}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sage-800 transition"
          >
            Try again
          </button>
        </div>
      )}

      {loadStatus === 'loaded' && filtered.length === 0 && (
        <div className="glow-card bg-card border border-border rounded-2xl p-10 text-center">
          <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No {filter === 'ALL' ? '' : filter.toLowerCase() + ' '}appointments.</p>
        </div>
      )}

      {loadStatus === 'loaded' && filtered.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block glow-card bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-mist/60 dark:bg-secondary/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Patient</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Requested</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => (
                  <tr key={a.id} className="align-top">
                    <td className="px-5 py-4">
                      <div className="font-medium">{a.user.name}</div>
                      <div className="text-muted-foreground flex items-center gap-1 text-xs mt-0.5">
                        <Mail className="w-3 h-3" /> {a.user.email}
                      </div>
                      {a.notes && <div className="text-xs text-muted-foreground mt-1 max-w-xs">&ldquo;{a.notes}&rdquo;</div>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">{format(new Date(a.date), 'MMM d, yyyy')}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{a.time}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{APPOINTMENT_TYPE_LABELS[a.type] ?? a.type}</td>
                    <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                    <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">{format(new Date(a.createdAt), 'MMM d, yyyy')}</td>
                    <td className="px-5 py-4 text-right">
                      {a.status === 'PENDING' ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => updateStatus(a.id, 'ACCEPTED')}
                            disabled={actioningId === a.id}
                            className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-sage-800 transition disabled:opacity-60 inline-flex items-center gap-1"
                          >
                            {actioningId === a.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Accept'}
                          </button>
                          <button
                            onClick={() => setRejectTarget(a)}
                            disabled={actioningId === a.id}
                            className="px-3 py-1.5 rounded-full border border-border text-xs font-semibold hover:border-red-400 hover:text-red-600 transition disabled:opacity-60"
                          >
                            Reject
                          </button>
                        </div>
                      ) : a.status === 'REJECTED' ? (
                        <div className="flex justify-end">
                          <button
                            onClick={() => setDeleteTarget(a)}
                            disabled={actioningId === a.id}
                            className="px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:border-red-400 hover:text-red-600 transition disabled:opacity-60 inline-flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">No action needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden space-y-4">
            {filtered.map((a) => (
              <div key={a.id} className="glow-card bg-card border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-medium">{a.user.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" /> {a.user.email}
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="text-sm space-y-1 text-muted-foreground mb-4">
                  <div>{APPOINTMENT_TYPE_LABELS[a.type] ?? a.type}</div>
                  <div>{format(new Date(a.date), 'MMM d, yyyy')} · {a.time}</div>
                  <div className="text-xs">Requested {format(new Date(a.createdAt), 'MMM d, yyyy')}</div>
                  {a.notes && <div className="text-xs italic">&ldquo;{a.notes}&rdquo;</div>}
                </div>
                {a.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(a.id, 'ACCEPTED')}
                      disabled={actioningId === a.id}
                      className="flex-1 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-sage-800 transition disabled:opacity-60 inline-flex items-center justify-center gap-1"
                    >
                      {actioningId === a.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Accept'}
                    </button>
                    <button
                      onClick={() => setRejectTarget(a)}
                      disabled={actioningId === a.id}
                      className="flex-1 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:border-red-400 hover:text-red-600 transition disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {a.status === 'REJECTED' && (
                  <button
                    onClick={() => setDeleteTarget(a)}
                    disabled={actioningId === a.id}
                    className="w-full px-4 py-2 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:border-red-400 hover:text-red-600 transition disabled:opacity-60 inline-flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Reject confirmation — never a browser confirm() */}
      <Dialog open={!!rejectTarget} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject this appointment?</DialogTitle>
            <DialogDescription>
              {rejectTarget && (
                <>
                  This will mark {rejectTarget.user.name}&apos;s {(APPOINTMENT_TYPE_LABELS[rejectTarget.type] ?? rejectTarget.type).toLowerCase()}{' '}
                  on {format(new Date(rejectTarget.date), 'MMMM d, yyyy')} as rejected. This can be changed again later if needed.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setRejectTarget(null)}
              className="px-5 py-2.5 rounded-full border border-border font-semibold hover:border-primary transition"
            >
              Cancel
            </button>
            <button
              onClick={() => rejectTarget && updateStatus(rejectTarget.id, 'REJECTED')}
              disabled={actioningId === rejectTarget?.id}
              className="px-5 py-2.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {actioningId === rejectTarget?.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reject Appointment'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation — permanent, so this is never a single click */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this appointment record?</DialogTitle>
            <DialogDescription>
              {deleteTarget && (
                <>
                  This will permanently remove {deleteTarget.user.name}&apos;s rejected{' '}
                  {(APPOINTMENT_TYPE_LABELS[deleteTarget.type] ?? deleteTarget.type).toLowerCase()} request from{' '}
                  {format(new Date(deleteTarget.date), 'MMMM d, yyyy')}. This cannot be undone.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-5 py-2.5 rounded-full border border-border font-semibold hover:border-primary transition"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteTarget && deleteAppointment(deleteTarget.id)}
              disabled={actioningId === deleteTarget?.id}
              className="px-5 py-2.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {actioningId === deleteTarget?.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete Permanently'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inline success/error notification — lightweight, no toast library */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-lg font-medium text-sm animate-fade-up ${
            toast.tone === 'success'
              ? 'bg-primary text-primary-foreground'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
