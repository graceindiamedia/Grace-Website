import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Church, Plus, Trash2, Edit2, LogOut, Check } from 'lucide-react';

export const AdminPage = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'events' | 'programs'>('events');
  const [events, setEvents] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  // Form states
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '', type: '', description: '', image: '' });
  const [programForm, setProgramForm] = useState({ title: '', description: '', image: '', time: '' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  const fetchData = async () => {
    if (activeTab === 'events') {
      const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (data) setEvents(data);
    } else {
      const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
      if (data) setPrograms(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('events').insert([eventForm]);
    if (!error) {
      setEventForm({ title: '', date: '', time: '', location: '', type: '', description: '', image: '' });
      fetchData();
    } else {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchData();
  };

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('programs').insert([programForm]);
    if (!error) {
      setProgramForm({ title: '', description: '', image: '', time: '' });
      fetchData();
    } else {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await supabase.from('programs').delete().eq('id', id);
    fetchData();
  };

  if (!import.meta.env.VITE_SUPABASE_URL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-6">
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-md w-full">
          <Church className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-serif mb-4">Supabase Not Configured</h2>
          <p className="text-ink/60 text-sm">Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables to enable the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-6">
        <div className="bg-white p-10 rounded-[40px] shadow-sm max-w-md w-full border border-ink/5">
          <div className="text-center mb-8">
            <Church className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-serif">Admin Login</h2>
            <p className="text-ink/60 text-sm mt-2">Manage website content</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs">{error}</div>}
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm" 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm" 
              required
            />
            <button 
              disabled={loading}
              className="w-full bg-ink text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif">Admin Dashboard</h1>
            <p className="text-ink/60 mt-2">Welcome back, {session.user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'events' ? 'bg-primary text-white shadow-md' : 'bg-white text-ink/60 hover:text-ink shadow-sm'}`}
          >
            Manage Events
          </button>
          <button 
            onClick={() => setActiveTab('programs')}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'programs' ? 'bg-primary text-white shadow-md' : 'bg-white text-ink/60 hover:text-ink shadow-sm'}`}
          >
            Manage Programs
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-ink/5">
              <h3 className="text-xl font-serif mb-6">{activeTab === 'events' ? 'Add New Event' : 'Add New Program'}</h3>
              
              {activeTab === 'events' ? (
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <input required placeholder="Event Title" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Date (e.g., Oct 15, 2026)" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Time (e.g., 09:00 AM - 04:00 PM)" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Location" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Type (e.g., Village Visit)" value={eventForm.type} onChange={e => setEventForm({...eventForm, type: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Image URL" value={eventForm.image} onChange={e => setEventForm({...eventForm, image: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <textarea required placeholder="Description" rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm resize-none" />
                  <button disabled={loading} className="w-full bg-ink text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors disabled:opacity-50">
                    {loading ? 'Saving...' : 'Publish Event'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCreateProgram} className="space-y-4">
                  <input required placeholder="Program Title" value={programForm.title} onChange={e => setProgramForm({...programForm, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Time/Frequency (e.g., Weekly)" value={programForm.time} onChange={e => setProgramForm({...programForm, time: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <input required placeholder="Image URL" value={programForm.image} onChange={e => setProgramForm({...programForm, image: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm" />
                  <textarea required placeholder="Description" rows={3} value={programForm.description} onChange={e => setProgramForm({...programForm, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-paper/50 border-none text-sm resize-none" />
                  <button disabled={loading} className="w-full bg-ink text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors disabled:opacity-50">
                    {loading ? 'Saving...' : 'Publish Program'}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {activeTab === 'events' ? (
                events.map(evt => (
                  <div key={evt.id} className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5 flex gap-4">
                    <img src={evt.image} alt={evt.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg leading-tight mb-1">{evt.title}</h4>
                      <p className="text-xs text-ink/60 mb-3">{evt.date}</p>
                      <button onClick={() => handleDeleteEvent(evt.id)} className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                programs.map(prog => (
                  <div key={prog.id} className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5 flex gap-4">
                    <img src={prog.image} alt={prog.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg leading-tight mb-1">{prog.title}</h4>
                      <p className="text-xs text-ink/60 mb-3">{prog.time}</p>
                      <button onClick={() => handleDeleteProgram(prog.id)} className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
              
              {(activeTab === 'events' ? events : programs).length === 0 && (
                <div className="col-span-full py-12 text-center text-ink/40 italic">
                  No records found. Create one to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
