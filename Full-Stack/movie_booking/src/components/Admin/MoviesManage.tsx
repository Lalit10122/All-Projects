import React, { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost, apiPut } from '../../lib/api';

const MoviesManage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState('');
  const [form, setForm] = useState<any>({ title:'', description:'', genre:'', duration:'', rating:0, releaseDate:'', image:'', trailerUrl:'', cast:'', director:'', language:'', price:0, showTimes:'' });

  const load = async () => {
    setItems(await apiGet('/api/movies'));
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Movies</h3>
        <div className="flex gap-2">
          <button className="border px-3 py-2 rounded" onClick={async()=>{ await apiPost('/api/admin/movies/reload',{}); await load(); }}>Reload from JSON</button>
          <button className="bg-red-600 text-white px-3 py-2 rounded" onClick={()=>{ setShowForm(true); setEditId(''); setForm({ title:'', description:'', genre:'', duration:'', rating:0, releaseDate:'', image:'', trailerUrl:'', cast:'', director:'', language:'', price:0, showTimes:'' }); }}>Add Movie</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((m:any)=>(
          <div key={m._id} className="border rounded p-3">
            <img src={m.image} alt={m.title} className="w-full h-40 object-cover rounded" />
            <div className="mt-2 font-semibold">{m.title}</div>
            <div className="text-sm text-gray-600">{m.genre}</div>
            <div className="flex gap-2 mt-2 text-sm">
              <button className="text-blue-600" onClick={()=>{ setEditId(m._id); setForm({ ...m, showTimes: (m.showTimes||[]).join(', ') }); setShowForm(true); }}>Edit</button>
              <button className="text-red-600" onClick={async()=>{ if (!confirm('Delete movie?')) return; await apiDelete(`/api/admin/movies/${m._id}`); await load(); }}>Delete</button>
            </div>
          </div>
        ))}
        {items.length===0 && <div className="text-gray-500">No movies</div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setShowForm(false)}>
          <div className="bg-white rounded p-4 w-full max-w-2xl" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-3">{editId? 'Edit Movie':'Add Movie'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Genre" value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Duration" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Rating" type="number" step="0.1" value={form.rating} onChange={e=>setForm({...form,rating:parseFloat(e.target.value||'0')})} />
              <input className="border p-2 rounded" placeholder="Release Date (YYYY-MM-DD)" value={form.releaseDate||''} onChange={e=>setForm({...form,releaseDate:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Language" value={form.language||''} onChange={e=>setForm({...form,language:e.target.value})} />
              <input className="border p-2 rounded col-span-2" placeholder="Poster URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
              <input className="border p-2 rounded col-span-2" placeholder="Trailer URL" value={form.trailerUrl||''} onChange={e=>setForm({...form,trailerUrl:e.target.value})} />
              <input className="border p-2 rounded col-span-2" placeholder="Cast (comma separated)" value={form.cast||''} onChange={e=>setForm({...form,cast:e.target.value})} />
              <input className="border p-2 rounded col-span-2" placeholder="Director" value={form.director||''} onChange={e=>setForm({...form,director:e.target.value})} />
              <textarea className="border p-2 rounded col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
              <input className="border p-2 rounded" placeholder="Ticket Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value||'0')})} />
              <input className="border p-2 rounded" placeholder="Showtimes (comma separated)" value={form.showTimes} onChange={e=>setForm({...form,showTimes:e.target.value})} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="border px-4 py-2 rounded" onClick={()=>setShowForm(false)}>Cancel</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={async()=>{
                const payload:any = { ...form, showTimes: String(form.showTimes||'').split(',').map((s:string)=>s.trim()).filter(Boolean) };
                if (editId) await apiPut(`/api/admin/movies/${editId}`, payload);
                else await apiPost('/api/admin/movies', payload);
                setShowForm(false); await load();
              }}>{editId? 'Save':'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesManage;


