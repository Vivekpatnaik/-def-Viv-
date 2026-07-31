'use client';

import React from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
}

export function Table({ headers, children, className = '', ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-slate-800 rounded-lg">
      <table className={`w-full border-collapse text-left text-sm ${className}`} {...props}>
        <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-slate-300">
          {children}
        </tbody>
      </table>
    </div>
  );
}
