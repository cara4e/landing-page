"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Globe, Activity, ChevronDown, Cpu, Server, Lock, QrCode } from 'lucide-react';
import NodeStatus from '@/components/NodeStatusDashboard';

const sectionVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.98,
    filter: "blur(10px)",
    y: 20 
  },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    y: 0 
  },
  transition: { 
    duration: 1.2, 
    ease: [0.22, 1, 0.36, 1] 
  }
};

const gridContainerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4 // Delayed slightly to wait for section reveal
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 150,
      damping: 15
    }
  },
  whileHover: { 
    y: -12, 
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  whileTap: { scale: 0.98 }
};

const SECTIONS = [
  { id: 'features', label: '特点' },
  { id: 'pricing', label: '定价' },
  { id: 'guide', label: '指南' },
  { id: 'faq', label: '常见问题' }
];

const FullPageSection = ({ id, children, bg = "bg-[#0d0e12]" }: { id: string, children: React.ReactNode, bg?: string }) => (
  <section 
    id={id} 
    className={`min-h-screen w-full relative flex items-center justify-center px-6 snap-start snap-always ${bg}`}
  >
    <motion.div
      className="max-w-7xl w-full py-24"
      initial="initial"
      whileInView="whileInView"
      variants={sectionVariants}
      // Removed once: true to allow repeating fade-in effect on every scroll
      viewport={{ once: false, amount: 0.3, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  </section>
);

export default function TailscaleDerpPage() {
  const [activeSection, setActiveSection] = useState('features');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory bg-[#0d0e12] text-slate-300 scroll-smooth">
      {/* 右上角客服二维码 */}
      <div className="fixed top-8 right-12 z-[110] group">
        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md cursor-help hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-black/20">
          <QrCode className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
        </div>
        
        {/* Hover Tooltip */}
        <div className="absolute top-full right-0 mt-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
          <div className="bg-[#16181d] border border-blue-500/30 p-5 rounded-[24px] shadow-[0_0_40px_rgba(59,130,246,0.25)] w-48 text-center backdrop-blur-lg">
            <div className="bg-white p-2 rounded-xl mb-4 shadow-inner">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/your_support_channel" 
                alt="Support QR Code"
                className="w-full h-full"
              />
            </div>
            <h4 className="text-sm font-bold text-white">联系客服支持</h4>
            <div className="absolute bottom-full right-6 border-8 border-transparent border-b-[#16181d]" />
          </div>
        </div>
      </div>

      {/* 侧边导航点 */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-6">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-end"
          >
            <div className={`relative flex items-center justify-center transition-all duration-500 ${
              activeSection === section.id ? 'scale-125' : 'scale-100'
            }`}>
              {activeSection === section.id && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute inset-0 bg-blue-500/20 rounded-full -m-2 blur-sm" 
                />
              )}
              <div className={`w-2 h-2 rounded-full border transition-all duration-500 ${
                activeSection === section.id 
                  ? 'bg-blue-500 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]' 
                  : 'bg-white/10 border-white/20 group-hover:bg-white/30 group-hover:border-white/40'
              }`} />
            </div>
          </button>
        ))}
      </div>

      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      {/* ================= 第一页：特点展示 ================= */}
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={gridContainerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {[
            { t: '全网 BGP 线路', d: '穿透移动/电信/联通屏障，解决打洞失败，让握手时间缩短至毫秒级。', icon: <Zap className="w-6 h-6 text-yellow-500" />, label: '加速核心', border: 'border-blue-500/40' },
            { t: '五大枢纽节点', d: '多点冗余，自动选择全国最低延迟路径。', icon: <Globe className="w-6 h-6 text-green-400" />, label: '节点覆盖' },
            { t: '端到端强加密', d: '遵循 WireGuard 原生协议，中转节点仅转发加密包，无法窥视任何数据。', icon: <Lock className="w-6 h-6 text-purple-400" />, label: '隐私安全' },
            { t: '4K 办公无压力', d: '专为 RDP、SSH 与 NAS 同步优化。远程桌面如局域网般丝滑流畅。', icon: <Activity className="w-6 h-6 text-pink-400" />, label: '极速体验' },
            { t: 'Anycast 负载', d: '自动连接离你最近的机房。如果某一节点维护，自动平滑切换至冗余节点。', icon: <Cpu className="w-6 h-6 text-orange-400" />, label: '智能调度' },
            { t: '零维护成本', d: '无需自建、无需续费证书。订阅即可获得高可用 derpMap 配置。', icon: <Server className="w-6 h-6 text-slate-400" />, label: '托管运维' }
          ].map((card, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              className={`bg-[#16181d] p-8 rounded-3xl border ${card.border || 'border-white/5'} transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-white/5 text-slate-400 text-[10px] px-2 py-1 rounded font-bold uppercase">{card.label}</span>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{card.t}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.d}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 底部指示 */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
          onClick={() => scrollToSection('pricing')}
        >
          <span className="text-[10px] uppercase tracking-widest mb-2 font-bold">滑动查看定价</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </FullPageSection>

      {/* ================= 第二页：套餐对比 ================= */}
      <FullPageSection id="pricing" bg="bg-[#0f1115]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">透明简单的定价方案</h2>
          <p className="text-slate-500 mt-4 font-light">选择最适合您的中继加速方案</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto scrollbar-hide pb-4 pt-32 -mt-32">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-8 px-6 text-slate-400 font-medium w-1/4">功能特性</th>
                  {[
                    { id: 'LITE', name: '基础版', price: '¥9.9' },
                    { id: 'PRO', name: '专业版', price: '¥19.9', featured: true },
                    { id: 'BIZ', name: '企业版', price: '¥99' }
                  ].map((plan) => (
                    <th key={plan.id} className={`py-8 px-6 text-center w-1/4 group relative cursor-help ${plan.featured ? 'bg-blue-600/20 rounded-t-3xl' : ''}`}>
                      {plan.featured && (
                        <div className="absolute -top-4 inset-x-0 flex justify-center">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest">最受欢迎</span>
                        </div>
                      )}
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 transition-colors group-hover:text-blue-400">{plan.name}</div>
                      <div className="text-2xl font-bold text-white mb-1 transition-transform flex items-center justify-center gap-2">
                        {plan.id}
                        <QrCode className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="text-blue-500 font-bold">{plan.price} <span className="text-xs text-slate-500 font-normal">/月</span></div>
                      
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 z-[100]">
                        <div className="bg-[#16181d] border border-blue-500/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)] w-44 text-center backdrop-blur-md">
                          <div className="bg-white p-2 rounded-xl mb-3">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/pay/${plan.id}`} alt="QR" className="w-full h-full" />
                          </div>
                          <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-1">扫码支付订阅</p>
                          <p className="text-[9px] text-blue-400 font-medium">{plan.id} 套餐</p>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-[#16181d]" />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { f: "节点数量", v: ["单选 1 个境内节点", "5 大节点全开启", "5 大节点 + 专属节点"] },
                  { f: "流量配额", v: ["100GB / 月", "无限流量", "500GB (独立统计)"] },
                  { f: "峰值带宽", v: ["20M", "100M", "500M / 独享"] },
                  { f: "智能调度 (Anycast)", v: [false, true, true] },
                  { f: "线路优先级", v: ["标准 BGP", "优先 BGP 线路", "顶级专线对接"] },
                  { f: "独立 IP 地址", v: [false, false, true] },
                  { f: "SLA 连通性保证", v: ["99.0%", "99.5%", "99.9%"] },
                ].map((row, i, arr) => (
                  <motion.tr key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-6 text-slate-400 group-hover:text-slate-200 transition-colors">{row.f}</td>
                    {row.v.map((val, j) => (
                      <td key={j} className={`py-5 px-6 text-center ${j === 1 ? 'bg-blue-600/20' : ''} ${j === 1 && i === arr.length - 1 ? 'rounded-b-3xl' : ''}`}>
                        {typeof val === 'boolean' ? (val ? <Check className="w-5 h-5 text-blue-500 mx-auto" /> : <span className="text-slate-700">—</span>) : (<span className={`${j === 1 ? 'text-white font-medium' : 'text-slate-500'} transition-colors group-hover:text-slate-300`}>{val}</span>)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FullPageSection>

      {/* ================= 第三页：指南 ================= */}
      <FullPageSection id="guide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-8 shrink-0">
              <Activity className="text-blue-500 w-6 h-6" />
              <h3 className="text-3xl font-bold text-white tracking-tight">节点实时状态</h3>
            </div>
            <div className="flex-grow">
              <NodeStatus />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-8 shrink-0">
              <Zap className="text-yellow-500 w-6 h-6 fill-yellow-500/20" />
              <h3 className="text-3xl font-bold text-white tracking-tight">三步极速上手</h3>
            </div>
            <div className="space-y-12 relative flex-grow">
              <div className="absolute left-7 top-10 bottom-10 w-px border-l-2 border-dashed border-blue-500/40 z-0" />
              {[
                { 
                  s: "01", 
                  t: "订阅并获取配置", 
                  d: "购买后在管理后台一键复制为您生成的专属 derpMap 配置代码。",
                  extra: (
                    <div className="mt-4 bg-[#050608] border border-white/10 rounded-xl p-4 font-mono text-[10px] text-blue-400/80 relative group/code overflow-hidden">
                      <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2 text-slate-600">
                        <span>derpMap.json</span>
                        <span className="text-[8px] border border-white/10 px-1 rounded">JSON</span>
                      </div>
                      <pre>
                        {`"DERPRegions": {\n  "901": {\n    "RegionID": 901,\n    "RegionCode": "cn-bj",\n    "Nodes": [...] \n  }\n}`}
                      </pre>
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/code:opacity-100 transition-opacity" />
                    </div>
                  )
                },
                { s: "02", t: "粘贴至 ACL 页面", d: "进入 Tailscale 官网后台 Access Control 页面，粘贴并保存配置。" },
                { s: "03", t: "尽享极速互联", d: "您的所有终端将自动发现境内节点，异地组网延迟瞬间降低 90%。" }
              ].map((item) => (
                <div key={item.s} className="flex gap-8 group relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#16181d] border border-white/10 flex items-center justify-center text-xl font-black text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shrink-0">{item.s}</div>
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.t}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.d}</p>
                    {item.extra}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FullPageSection>

      {/* ================= 第四页：FAQ ================= */}
      <FullPageSection id="faq" bg="bg-[#0d0e12]">
        <div className="w-full">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white">常见问题 FAQ</h3>
            <p className="text-slate-500 mt-2 text-sm">如果您还有其他疑问，欢迎联系我们的技术支持</p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto" variants={gridContainerVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {[
              { q: "什么是 DERP，它有什么作用？", a: "DERP 是 Tailscale 的中继协议。当两个节点无法直接 P2P 连接时，流量会通过 DERP 节点中转。我们的自建 DERP 节点提供极低的延迟和稳定的带宽。" },
              { q: "使用第三方 DERP 会泄露我的隐私吗？", a: "完全不会。Tailscale 基于 WireGuard 构建，所有数据端到端加密。DERP 节点无法窥视您的原始数据。" },
              { q: "你们会记录我的访问日志吗？", a: "我们坚持无日志策略。节点仅进行实时的流量转发，不记录任何用户的访问历史。" },
              { q: "服务商能看到我的设备列表吗？", a: "不能。DERP 协议本身是无状态的，无法获取您的设备名称或网络拓扑。" },
              { q: "流量用尽后会发生什么？", a: "流量达到上限后，该节点的中转速度将限制在基础速率，您可以通过后台平滑升级。" },
              { q: "支持哪些平台使用？", a: "支持所有安装了 Tailscale 官方客户端的平台，包括 Windows, macOS, Linux, iOS, Android 等。" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={cardVariants} whileTap="whileTap" className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors cursor-default">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item.q}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
          <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">
            <p>© 2025 DERP-CHINA PRO. 极致异地组网方案</p>
            <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-400 transition-colors">Telegram 群组</a>
              <a href="#" className="hover:text-blue-400 transition-colors">技术支持</a>
              <a href="#" className="hover:text-blue-400 transition-colors">服务条款</a>
            </div>
          </footer>
        </div>
      </FullPageSection>
    </div>
  );
}
