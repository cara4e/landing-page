"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Globe, Activity, ChevronDown, Cpu, Server, Lock } from 'lucide-react';
import NodeStatus from '@/components/NodeStatusDashboard';
import Lenis from 'lenis'

const sectionVariants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.9, 
    ease: [0.16, 1, 0.3, 1] // 经典的 Out-Quint 缓动，极其丝滑
  }
};

const FullPageSection = ({ id, children, bg = "bg-[#0d0e12]" }: { id: string, children: React.ReactNode, bg?: string }) => (
  <section 
    id={id} 
    className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden px-6 py-24 ${bg}`}
  >
    <motion.div
      className="max-w-7xl w-full"
      initial="initial"
      whileInView="whileInView"
      variants={sectionVariants}
      // 这里的 margin: "-10% 0px" 确保内容不会在屏幕最边缘触发
      // amount: 0.1 保证了及时的视觉反馈
      viewport={{ once: true, amount: 0.1, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  </section>
);

export default function TailscaleDerpPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0e12] text-slate-300">

      {/* 背景光晕装饰 */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      {/* ================= 第一页：特点展示 (2x3 Grid) ================= */}
      <FullPageSection id="features">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/50 text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-500/5">
              <span className="relative flex h-2 w-2">
                <span className="status-dot absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Tailscale 专用 DERP 网络
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              轻连 <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DERP</span>  ，畅享极速网络
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">全网 BGP 节点 · 极致互联</h2>
          </div>
          <div className="text-right max-w-sm text-slate-500 text-sm leading-relaxed border-l border-white/10 pl-6">
            专为中国网络环境优化。告别跨境延迟与丢包。
            覆盖全国核心枢纽，让异地组网快如局域网。
          </div>
        </header>

        {/* 这里的网格卡片添加了统一的 Hover 逻辑 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 (默认保留蓝色边框以作区分，或统一样式) */}
          <div className="bg-[#16181d] p-8 rounded-3xl border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:border-blue-400">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-1 rounded font-bold uppercase">加速核心</span>
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">全网 BGP 线路</h3>
            <p className="text-sm text-slate-500 leading-relaxed">穿透移动/电信/联通屏障，解决打洞失败，让握手时间缩短至毫秒级。</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#16181d] p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-green-600/20 text-green-400 text-[10px] px-2 py-1 rounded font-bold uppercase">节点覆盖</span>
              <Globe className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">五大枢纽节点</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['北京 BGP', '上海 10G', '深圳 极速', '武汉 枢纽', '成都 西南'].map(node => (
                <span key={node} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-slate-400">{node}</span>
              ))}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">多点冗余，自动选择全国最低延迟路径。</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#16181d] p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-purple-600/20 text-purple-400 text-[10px] px-2 py-1 rounded font-bold uppercase">隐私安全</span>
              <Lock className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">端到端强加密</h3>
            <p className="text-sm text-slate-500 leading-relaxed">遵循 WireGuard 原生协议，中转节点仅转发加密包，无法窥视任何数据。</p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#16181d] p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-pink-600/20 text-pink-400 text-[10px] px-2 py-1 rounded font-bold uppercase">极速体验</span>
              <Activity className="w-6 h-6 text-pink-400 group-hover:animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">4K 办公无压力</h3>
            <p className="text-sm text-slate-500 leading-relaxed">专为 RDP、SSH 与 NAS 同步优化。远程桌面如局域网般丝滑流畅。</p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#16181d] p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-orange-600/20 text-orange-400 text-[10px] px-2 py-1 rounded font-bold uppercase">智能调度</span>
              <Cpu className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Anycast 负载</h3>
            <p className="text-sm text-slate-500 leading-relaxed">自动连接离你最近的机房。如果某一节点维护，自动平滑切换至冗余节点。</p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#16181d] p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-slate-600/20 text-slate-400 text-[10px] px-2 py-1 rounded font-bold uppercase">托管运维</span>
              <Server className="w-6 h-6 text-slate-400 group-hover:text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">零维护成本</h3>
            <p className="text-sm text-slate-500 leading-relaxed">无需自建、无需续费证书。订阅即可获得高可用 derpMap 配置。</p>
          </div>
        </div>

        {/* 底部指示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-50">
          <span className="text-[10px] uppercase tracking-widest mb-2 font-bold">滑动查看定价</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </FullPageSection>

      {/* ================= 第二页：套餐方案 ================= */}
      <FullPageSection id="pricing" bg="bg-[#0f1115]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">透明简单的定价方案</h2>
          <p className="text-slate-500 mt-4 font-light">选择最适合您的中继加速方案</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* LITE */}
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">基础版 LITE</h3>
              <div className="text-4xl font-bold text-white">¥9.9 <span className="text-base font-normal text-slate-500">/月</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-400">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> 单选 1 个境内节点</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> 100GB 流量 · 20M 带宽</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> 个人学习/NAS 管理首选</li>
            </ul>
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold transition-all">购买基础版</button>
          </div>

          {/* PRO - Featured - 修复了标签显示问题 */}
          <div className="relative flex flex-col scale-105 z-10 group mt-4 md:mt-0">

            {/* 1. 修复后的标签：使用白色背景，增加阴影，放在卡片容器外防止被裁剪 */}
            <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
              <span className="bg-white text-blue-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest shadow-xl border border-blue-100 whitespace-nowrap">
                最受欢迎
              </span>
            </div>

            {/* 2. 主卡片主体 */}
            <div className="bg-blue-600 p-10 rounded-[40px] flex flex-col flex-grow shadow-2xl shadow-blue-600/30 border border-blue-400 relative overflow-hidden">

              {/* 背景装饰：增加一个微弱的光晕，让卡片看起来更高端 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 rounded-full" />

              <div className="mb-8 relative z-10">
                <h3 className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-4">
                  专业版 PRO
                </h3>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-5xl font-bold">¥19.9</span>
                  <span className="text-lg font-normal text-blue-200">/月</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow text-sm text-blue-50 relative z-10">
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>5 大节点全开启 (Anycast)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>无限流量 · 100M 峰值</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>优先 BGP 线路出口</span>
                </li>
              </ul>

              <button className="w-full py-4 rounded-2xl bg-white text-blue-600 font-black shadow-xl hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10">
                立即订阅专业版
              </button>
            </div>
          </div>

          {/* BIZ */}
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 flex flex-col opacity-80">
            <div className="mb-8">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">企业版 BIZ</h3>
              <div className="text-4xl font-bold text-white">¥99 <span className="text-base font-normal text-slate-500">/月</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-400">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-500" /> 独立独享 IP / 专线对接</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-500" /> 500M 带宽 · 专属通道</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-500" /> SLA 99.9% 连通性保证</li>
            </ul>
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold transition-all">联系商务定制</button>
          </div>
        </div>
      </FullPageSection>

      {/* ================= 第三页：配置方法 & FAQ ================= */}
      <FullPageSection id="guide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* ================= 左侧：节点实时状态 ================= */}
          {/* 左侧：使用封装好的组件 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Activity className="text-blue-500 w-6 h-6" />
              <h3 className="text-3xl font-bold text-white tracking-tight">节点实时状态</h3>
            </div>
            <NodeStatus />
          </div>

          {/* ================= 右侧：快速上手指南 ================= */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-500 w-6 h-6 fill-yellow-500/20" />
              <h3 className="text-3xl font-bold text-white tracking-tight">三步极速上手</h3>
            </div>

            <div className="space-y-10">
              {[
                { s: "01", t: "订阅并获取配置", d: "购买后在管理后台一键复制为您生成的专属 derpMap 配置代码。" },
                { s: "02", t: "粘贴至 ACL 页面", d: "进入 Tailscale 官网后台 Access Control 页面，粘贴并保存配置。" },
                { s: "03", t: "尽享极速互联", d: "您的所有终端将自动发现境内节点，异地组网延迟瞬间降低 90%。" }
              ].map((item) => (
                <div key={item.s} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg">
                    {item.s}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.t}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div></div>

        </div>

        {/* Footer Area */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          <p>© 2025 DERP-CHINA PRO. 极致异地组网方案</p>
          <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-400 transition-colors">Telegram 群组</a>
            <a href="#" className="hover:text-blue-400 transition-colors">技术支持</a>
            <a href="#" className="hover:text-blue-400 transition-colors">服务条款</a>
          </div>
        </footer>
      </FullPageSection >

    </div >
  );
}
