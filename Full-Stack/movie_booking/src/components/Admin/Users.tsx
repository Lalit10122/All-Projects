import React, { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost, apiPut } from '../../lib/api';

const UsersAdmin: React.FC = () => {
  const [q, setQ] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>({ name:'', email:'', phone:'', address:'', age:0, preferences:'', membershipStatus:'none', password:'' });
  const [editId, setEditId] = useState<string>('');

  const load = async () => {
    const params = new URLSearchParams({ q, membershipStatus, minAge, maxAge, limit: '50' } as any).toString();
    const res = await apiGet(`/api/admin/users?${params}`);
    setItems(res.items || []);
  };

  useEffect(() => { load(); // initial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <input className="border p-2 rounded" placeholder="Search name/email/phone" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border p-2 rounded" value={membershipStatus} onChange={e=>setMembershipStatus(e.target.value)}>
          <option value="">Membership</option>
          <option value="none">None</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
        </select>
        <input className="border p-2 rounded w-24" placeholder="Min age" value={minAge} onChange={e=>setMinAge(e.target.value)} />
        <input className="border p-2 rounded w-24" placeholder="Max age" value={maxAge} onChange={e=>setMaxAge(e.target.value)} />
        <button className="bg-gray-800 text-white px-3 py-2 rounded" onClick={load}>Search</button>
        <button className="bg-red-600 text-white px-3 py-2 rounded" onClick={()=>{ setShowForm(true); setEditId(''); setForm({ name:'', email:'', phone:'', address:'', age:0, preferences:'', membershipStatus:'none', password:'' }); }}>Add User</button>
        {selected.length>0 && (
          <>
            <button className="border px-3 py-2 rounded" onClick={async()=>{ await apiPost('/api/admin/users/bulk-delete', { ids: selected }); setSelected([]); await load(); }}>Bulk Delete</button>
            <button className="border px-3 py-2 rounded" onClick={async()=>{ await apiPost('/api/admin/users/bulk-update', { ids: selected, update: { membershipStatus: 'gold' } }); setSelected([]); await load(); }}>Set Gold</button>
          </>
        )}
      </div>

      <div className="overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2"><input type="checkbox" checked={selected.length===items.length && items.length>0} onChange={e=>setSelected(e.target.checked?items.map(x=>x._id):[])} /></th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Membership</th>
              <th className="p-2">Age</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u)=> (
              <tr key={u._id} className="border-t">
                <td className="p-2"><input type="checkbox" checked={selected.includes(u._id)} onChange={e=>setSelected(e.target.checked?[...selected,u._id]:selected.filter(id=>id!==u._id))} /></td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.phone}</td>
                <td className="p-2">{u.membershipStatus}</td>
                <td className="p-2">{u.age ?? ''}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600" onClick={()=>{ setShowForm(true); setEditId(u._id); setForm({ ...u, preferences: (u.preferences||[]).join(', ') }); }}>Edit</button>
                  <button className="text-red-600" onClick={async()=>{ if (!confirm('Delete user?')) return; await apiDelete(`/api/admin/users/${u._id}`); await load(); }}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length===0 && (
              <tr><td className="p-2" colSpan={7}>No users</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setShowForm(false)}>
          <div className="bg-white rounded p-4 w-full max-w-xl" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-3">{editId? 'Edit User':'Add User'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
              <select className="border p-2 rounded" value={form.membershipStatus} onChange={e=>setForm({...form,membershipStatus:e.target.value})}>
                <option value="none">None</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
              <input className="border p-2 rounded col-span-2" placeholder="Preferences (comma separated)" value={form.preferences} onChange={e=>setForm({...form,preferences:e.target.value})} />
              {!editId && <input className="border p-2 rounded col-span-2" placeholder="Password (default 123456)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="border px-4 py-2 rounded" onClick={()=>setShowForm(false)}>Cancel</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={async()=>{
                const payload = { ...form, preferences: String(form.preferences||'').split(',').map((s:string)=>s.trim()).filter(Boolean) } as any;
                if (editId) { await apiPut(`/api/admin/users/${editId}`, payload); }
                else { await apiPost('/api/admin/users', payload); }
                setShowForm(false); await load();
              }}>{editId? 'Save':'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersAdmin;


