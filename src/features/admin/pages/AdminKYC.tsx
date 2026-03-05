import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Clock, Search, Filter, MapPin, FileText, AlertTriangle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';

const INITIAL_KYC = [
    { id: 1, name: 'Rajesh Kumar', role: 'Farmer', submitted: '2 hours ago', status: 'pending', docs: 3, location: 'Andhra Pradesh', email: 'rajesh@email.com', phone: '+91 98765 43210', docList: ['Aadhaar Card', 'Land Document', 'Bank Passbook'], farmSize: '5 acres', crops: 'Rice, Wheat' },
    { id: 2, name: 'Priya Foods Pvt Ltd', role: 'Business', submitted: '5 hours ago', status: 'pending', docs: 5, location: 'Maharashtra', email: 'priya@foods.com', phone: '+91 87654 32109', docList: ['GST Certificate', 'PAN Card', 'Company Registration', 'Address Proof', 'Bank Statement'], farmSize: 'N/A', crops: 'N/A' },
    { id: 3, name: 'Suresh Reddy', role: 'Bulk_Farmer', submitted: '1 day ago', status: 'review', docs: 4, location: 'Telangana', email: 'suresh@email.com', phone: '+91 76543 21098', docList: ['Aadhaar Card', 'Land Document', 'FPO Certificate', 'Bank Passbook'], farmSize: '25 acres', crops: 'Cotton, Turmeric' },
    { id: 4, name: 'Anita Sharma', role: 'Farmer', submitted: '2 days ago', status: 'pending', docs: 3, location: 'Rajasthan', email: 'anita@email.com', phone: '+91 65432 10987', docList: ['Aadhaar Card', 'Land Document', 'Bank Passbook'], farmSize: '3 acres', crops: 'Mustard, Millet' },
    { id: 5, name: 'GreenLeaf Organics', role: 'Business', submitted: '3 days ago', status: 'pending', docs: 6, location: 'Karnataka', email: 'info@greenleaf.com', phone: '+91 54321 09876', docList: ['GST Certificate', 'PAN Card', 'Company Registration', 'FSSAI License', 'Address Proof', 'Bank Statement'], farmSize: 'N/A', crops: 'N/A' },
    { id: 6, name: 'Ramappa Gowda', role: 'Farmer', submitted: '3 days ago', status: 'review', docs: 3, location: 'Karnataka', email: 'ramappa@email.com', phone: '+91 43210 98765', docList: ['Aadhaar Card', 'Land Document', 'Bank Passbook'], farmSize: '8 acres', crops: 'Coffee, Pepper' },
    { id: 7, name: 'SpiceKing Exports', role: 'Business', submitted: '4 days ago', status: 'pending', docs: 7, location: 'Kerala', email: 'info@spiceking.in', phone: '+91 32109 87654', docList: ['GST Certificate', 'PAN Card', 'IEC Code', 'Company Registration', 'FSSAI License', 'Address Proof', 'Bank Statement'], farmSize: 'N/A', crops: 'N/A' },
];

const STATUS_TABS = ['All', 'pending', 'review'];

const roleColors: Record<string, string> = { Farmer: '#4B6D53', Business: '#0288D1', Bulk_Farmer: '#E65100' };

const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    pending: { label: 'Pending', icon: Clock, color: '#F57C00', bg: 'rgba(245, 124, 0, 0.1)' },
    review: { label: 'In Review', icon: AlertTriangle, color: '#0288D1', bg: 'rgba(2, 136, 209, 0.1)' },
};

export const AdminKYC = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [kycQueue, setKycQueue] = useState(INITIAL_KYC);
    const [selectedKYC, setSelectedKYC] = useState<typeof INITIAL_KYC[0] | null>(null);
    const [actionFeedback, setActionFeedback] = useState<{ id: number; action: string } | null>(null);

    const handleAction = (id: number, action: string) => {
        setActionFeedback({ id, action });
        setTimeout(() => {
            setKycQueue((prev) => prev.filter((k) => k.id !== id));
            if (selectedKYC?.id === id) setSelectedKYC(null);
            setActionFeedback(null);
        }, 800);
    };

    const filtered = activeTab === 'All' ? kycQueue : kycQueue.filter((k) => k.status === activeTab);

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">
            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #1A2E20 0%, #2F4A35 50%, #3B5A42 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">Verification Center</span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">KYC Verification Queue</h1>
                        <p className="text-white/60 mt-1 text-sm">Review and process pending identity verifications.</p>
                    </div>
                    <div className="px-4 py-2 rounded-2xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {kycQueue.filter(k => k.status === 'pending').length} awaiting review
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Pending', count: 5, icon: Clock, color: '#F57C00' },
                    { label: 'In Review', count: 2, icon: AlertTriangle, color: '#0288D1' },
                    { label: 'Approved Today', count: 8, icon: CheckCircle, color: '#2E7D32' },
                    { label: 'Rejected Today', count: 1, icon: XCircle, color: '#D32F2F' },
                ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        className="p-4 rounded-2xl flex items-center gap-4"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <div className="p-2.5 rounded-xl" style={{ backgroundColor: s.color + '15' }}><s.icon className="w-5 h-5" style={{ color: s.color }} /></div>
                        <div>
                            <p className="text-xl font-black" style={{ color: s.color }}>{s.count}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                    <input type="text" placeholder="Search applicants..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                </div>
                <button className="px-4 rounded-xl flex items-center gap-2 text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
                {STATUS_TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all"
                        style={{
                            backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'var(--color-bg-card)',
                            color: activeTab === tab ? 'white' : 'var(--color-text-secondary)',
                            border: activeTab === tab ? 'none' : '1px solid var(--color-border)',
                        }}>
                        {tab === 'All' ? `All (${kycQueue.length})` : `${statusConfig[tab]?.label} (${kycQueue.filter(k => k.status === tab).length})`}
                    </button>
                ))}
            </div>

            {/* KYC Cards */}
            <div className="space-y-4">
                {filtered.map((item, i) => {
                    const sc = statusConfig[item.status] || statusConfig.pending;
                    const StatusIcon = sc.icon;
                    return (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                            whileHover={{ y: -2 }} onClick={() => setSelectedKYC(item)}
                            className="rounded-[24px] p-5 transition-all cursor-pointer"
                            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-lg shrink-0"
                                        style={{ backgroundColor: roleColors[item.role] || '#4B6D53' }}>{item.name.charAt(0)}</div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</p>
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg"
                                                style={{ backgroundColor: (roleColors[item.role] || '#4B6D53') + '15', color: roleColors[item.role] || '#4B6D53' }}>{item.role}</span>
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                <MapPin className="w-3 h-3" /> {item.location}
                                            </span>
                                            <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                <FileText className="w-3 h-3" /> {item.docs} docs
                                            </span>
                                            <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                <Clock className="w-3 h-3" /> {item.submitted}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-18 sm:ml-0">
                                    {actionFeedback?.id === item.id ? (
                                        <span className="text-sm font-bold" style={{ color: actionFeedback.action === 'approved' ? '#2E7D32' : '#D32F2F' }}>
                                            {actionFeedback.action === 'approved' ? '✅ Approved' : '❌ Rejected'}
                                        </span>
                                    ) : (
                                        <>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                style={{ backgroundColor: sc.bg, color: sc.color }}>
                                                <StatusIcon className="w-3 h-3" /> {sc.label}
                                            </span>
                                            <button className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors" onClick={(e) => { e.stopPropagation(); handleAction(item.id, 'approved'); }}>Approve</button>
                                            <button className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors" onClick={(e) => { e.stopPropagation(); handleAction(item.id, 'rejected'); }}>Reject</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* KYC Detail Modal */}
            <DetailModal isOpen={!!selectedKYC} onClose={() => setSelectedKYC(null)}
                title={selectedKYC?.name || ''} subtitle={`${selectedKYC?.role} • ${selectedKYC?.location}`}
                accentColor={roleColors[selectedKYC?.role || ''] || '#4B6D53'}
                icon={selectedKYC && <Shield className="w-5 h-5" style={{ color: roleColors[selectedKYC.role] || '#4B6D53' }} />}>
                {selectedKYC && (
                    <div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-xl"
                                style={{ backgroundColor: roleColors[selectedKYC.role] || '#4B6D53' }}>{selectedKYC.name.charAt(0)}</div>
                            <div>
                                <p className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedKYC.name}</p>
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg"
                                    style={{ backgroundColor: (statusConfig[selectedKYC.status] || statusConfig.pending).bg, color: (statusConfig[selectedKYC.status] || statusConfig.pending).color }}>
                                    {(statusConfig[selectedKYC.status] || statusConfig.pending).label}
                                </span>
                            </div>
                        </div>

                        <DetailRow label="Email" value={selectedKYC.email} />
                        <DetailRow label="Phone" value={selectedKYC.phone} />
                        <DetailRow label="Location" value={selectedKYC.location} />
                        <DetailRow label="Submitted" value={selectedKYC.submitted} />
                        {selectedKYC.farmSize !== 'N/A' && <DetailRow label="Farm Size" value={selectedKYC.farmSize} />}
                        {selectedKYC.crops !== 'N/A' && <DetailRow label="Crops" value={selectedKYC.crops} />}

                        {/* Documents List */}
                        <h4 className="text-xs font-bold uppercase tracking-wider mt-5 mb-3" style={{ color: 'var(--color-text-muted)' }}>
                            Submitted Documents ({selectedKYC.docs})
                        </h4>
                        <div className="space-y-2">
                            {selectedKYC.docList.map((doc) => (
                                <div key={doc} className="flex items-center justify-between p-3 rounded-xl"
                                    style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                    <span className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                                        <FileText className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> {doc}
                                    </span>
                                    <button className="p-1.5 rounded-lg" style={{ color: 'var(--color-accent)' }}>
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-5">
                            <button onClick={() => handleAction(selectedKYC.id, 'approved')}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white">✅ Approve</button>
                            <button onClick={() => handleAction(selectedKYC.id, 'rejected')}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-500/10 text-red-500">❌ Reject</button>
                        </div>
                    </div>
                )}
            </DetailModal>
        </div>
    );
};
