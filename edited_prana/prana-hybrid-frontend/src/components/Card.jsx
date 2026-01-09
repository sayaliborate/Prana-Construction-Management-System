import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`rounded-2xl shadow-md border p-6 bg-white ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-4 font-semibold text-lg">{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function Button({ className = '', ...props }) {
  return (
    <button 
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-slate-200 bg-white hover:bg-slate-50 transition ${className}`} 
      {...props} 
    />
  );
}
