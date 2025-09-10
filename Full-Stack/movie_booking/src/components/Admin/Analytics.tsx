import React, { useEffect, useRef, useState } from 'react';
import { apiGet } from '../../lib/api';

const Analytics: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [by, setBy] = useState('day');
  const [revenue, setRevenue] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const load = async () => {
    const rev = await apiGet(`/api/admin/analytics/revenue?by=${by}${from?`&from=${from}`:''}${to?`&to=${to}`:''}`);
    const pop = await apiGet('/api/admin/analytics/popular-movies');
    setRevenue(rev||[]);
    setPopular(pop||[]);
  };

  useEffect(()=>{ load(); // eslint-disable-next-line
  },[by]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    // simple canvas line chart (no external lib) for quick demo
    ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    const padding = 30;
    const values = revenue.map(r=>r.revenue);
    const maxV = Math.max(10, ...values);
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2;
    ctx.beginPath();
    revenue.forEach((r, i) => {
      const x = padding + (i*(w-2*padding))/Math.max(1,revenue.length-1);
      const y = h - padding - ((r.revenue/maxV)*(h-2*padding));
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.stroke();
  }, [revenue]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <input className="border p-2 rounded" type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={to} onChange={e=>setTo(e.target.value)} />
        <select className="border p-2 rounded" value={by} onChange={e=>setBy(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        <button className="bg-gray-800 text-white px-3 py-2 rounded" onClick={load}>Apply</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Revenue</h3>
        <canvas ref={canvasRef} width={600} height={240} className="w-full border rounded"></canvas>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Popular Movies</h3>
        <ul className="divide-y">
          {popular.map((p:any)=>(
            <li key={p._id} className="py-2 flex justify-between"><span>{p._id}</span><span className="text-gray-600">{p.count} • ₹{p.revenue}</span></li>
          ))}
          {popular.length===0 && <li className="py-2 text-gray-500">No data</li>}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;


