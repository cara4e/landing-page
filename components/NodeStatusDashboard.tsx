"use client";

import { useState, useEffect } from 'react';

interface Node {
    id: string;
    name: string;
    region: string;
    basePing: number;
    currentPing?: number;
    status: 'optimal' | 'good';
}

// 移除了 status 为 'busy' 的成都节点
const INITIAL_NODES: Node[] = [
    { id: 'bj', name: '北京 BGP', region: '华北枢纽', basePing: 8, status: 'optimal' },
    { id: 'sh', name: '上海 10G', region: '华东枢纽', basePing: 12, status: 'optimal' },
    { id: 'sz', name: '深圳 极速', region: '华南枢纽', basePing: 14, status: 'optimal' },
    { id: 'wh', name: '武汉', region: '华中枢纽', basePing: 22, status: 'good' },
    { id: 'cd', name: '成都', region: '西南枢纽', basePing: 30, status: 'good' },
];

export default function NodeStatus() {
    const [nodes, setNodes] = useState(INITIAL_NODES);

    useEffect(() => {
        const timer = setInterval(() => {
            setNodes((prevNodes) =>
                prevNodes.map((node) => ({
                    ...node,
                    currentPing: node.basePing + Math.floor(Math.random() * 3),
                }))
            );
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-6">
            {/* 状态看板主体 - 仅展示在线节点 */}
            <div className="bg-white/5 rounded-[24px] p-5 border border-white/10 backdrop-blur-sm shadow-2xl divide-y divide-white/5">
                {nodes.map((node) => {
                    const isOptimal = node.status === 'optimal';

                    return (
                        <div
                            key={node.id}
                            className="flex items-center justify-between py-3.5 group"
                        >
                            <div className="flex items-center gap-3">
                                {/* 状态指示灯 */}
                                <span className="relative flex h-2 w-2 shrink-0">
                                    {isOptimal && (
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    )}
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isOptimal ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}></span>
                                </span>

                                {/* 节点名称和区域 */}
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-sm text-white tracking-wide group-hover:text-blue-400 transition-colors">
                                        {node.name}
                                    </span>
                                    <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">
                                        {node.region}
                                    </span>
                                </div>
                            </div>

                            {/* Ping 值显示 */}
                            <div className="text-right">
                                <span className={`font-mono text-xl font-black transition-all duration-500 ${isOptimal ? 'text-green-400' : 'text-yellow-400'
                                    }`}>
                                    {node.currentPing || node.basePing}
                                    <small className="text-[9px] ml-0.5 opacity-60 font-normal">ms</small>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 底部小字背书 */}
            <div className="px-4 flex justify-between items-center">
                <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] leading-relaxed">
                    数据每 2.5s 自动更新
                </p>
            </div>

        </div>
    );
}