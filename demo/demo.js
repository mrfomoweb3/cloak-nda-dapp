// Demo state
let currentRole = 'creator';
let demoNDAs = [];
let currentStep = 0;

// Role switching
function switchRole(role) {
    currentRole = role;
    
    // Update button styles
    document.querySelectorAll('[id$="-btn"]').forEach(btn => {
        btn.className = 'px-6 py-3 rounded-lg font-medium transition bg-slate-700 text-slate-300 hover:bg-slate-600';
    });
    document.getElementById(`${role}-btn`).className = 'px-6 py-3 rounded-lg font-medium transition bg-blue-500 text-white';
    
    // Show appropriate interface
    showInterface(role);
}

function showInterface(role) {
    const content = document.getElementById('demo-content');
    
    switch(role) {
        case 'creator':
            content.innerHTML = getCreatorInterface();
            break;
        case 'counterparty':
            content.innerHTML = getCounterpartyInterface();
            break;
        case 'auditor':
            content.innerHTML = getAuditorInterface();
            break;
    }
}

function getCreatorInterface() {
    return `
        <div class="space-y-6 fade-in">
            <h2 class="text-xl font-semibold mb-4">👨‍💼 Create New NDA</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">NDA Title</label>
                        <input type="text" id="nda-title" placeholder="Software Development NDA" 
                            class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Counterparty Address</label>
                        <input type="text" id="counterparty-address" placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87" 
                            class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">NDA Terms</label>
                        <textarea id="nda-terms" rows="4" placeholder="Enter confidential NDA terms..." 
                            class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Expiration Date</label>
                        <input type="date" id="expiration-date" 
                            class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    </div>
                    
                    <button onclick="createNDA()" 
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition">
                        🔒 Create Encrypted NDA
                    </button>
                </div>
                
                <div class="space-y-4">
                    <h3 class="text-lg font-medium">🔐 Encryption Process</h3>
                    <div id="encryption-demo" class="space-y-3">
                        <div class="p-3 bg-slate-700 rounded border-l-4 border-gray-500">
                            <div class="text-sm text-gray-400">Waiting for NDA creation...</div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <h4 class="text-md font-medium mb-3">📋 Your NDAs</h4>
                        <div id="creator-ndas" class="space-y-2">
                            ${demoNDAs.length === 0 ? '<p class="text-slate-400 text-sm">No NDAs created yet</p>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCounterpartyInterface() {
    return `
        <div class="space-y-6 fade-in">
            <h2 class="text-xl font-semibold mb-4">🤝 Review & Sign NDAs</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h3 class="text-lg font-medium">📨 Pending NDAs</h3>
                    <div id="pending-ndas" class="space-y-3">
                        ${getPendingNDAs()}
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h3 class="text-lg font-medium">🔓 Decryption Process</h3>
                    <div id="decryption-demo" class="space-y-3">
                        <div class="p-3 bg-slate-700 rounded border-l-4 border-gray-500">
                            <div class="text-sm text-gray-400">Select an NDA to view decryption process</div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <h4 class="text-md font-medium mb-3">✅ Signed NDAs</h4>
                        <div id="signed-ndas" class="space-y-2">
                            ${getSignedNDAs()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAuditorInterface() {
    return `
        <div class="space-y-6 fade-in">
            <h2 class="text-xl font-semibold mb-4">🔍 Audit Trail & Verification</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h3 class="text-lg font-medium">📊 NDA Overview</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-700 p-4 rounded-lg text-center">
                            <div class="text-2xl font-bold text-blue-400">${demoNDAs.length}</div>
                            <div class="text-sm text-slate-300">Total NDAs</div>
                        </div>
                        <div class="bg-slate-700 p-4 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-400">${demoNDAs.filter(n => n.status === 'signed').length}</div>
                            <div class="text-sm text-slate-300">Signed</div>
                        </div>
                    </div>
                    
                    <h4 class="text-md font-medium mt-6">🔍 Select NDA to Audit</h4>
                    <div id="audit-ndas" class="space-y-2">
                        ${getAuditNDAs()}
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h3 class="text-lg font-medium">📋 Audit Trail</h3>
                    <div id="audit-trail" class="space-y-2 max-h-96 overflow-y-auto">
                        <div class="text-slate-400 text-sm">Select an NDA to view its audit trail</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Demo functions
function createNDA() {
    const title = document.getElementById('nda-title').value || 'Software Development NDA';
    const counterparty = document.getElementById('counterparty-address').value || '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87';
    const terms = document.getElementById('nda-terms').value || 'Confidential software development terms and conditions...';
    
    // Simulate encryption process
    simulateEncryption(title, terms, counterparty);
}

function simulateEncryption(title, terms, counterparty) {
    const steps = [
        { text: 'Input Validation', color: 'yellow', delay: 500 },
        { text: 'fhEVM Encryption', color: 'blue', delay: 1000 },
        { text: 'Smart Contract Call', color: 'purple', delay: 1500 },
        { text: 'Blockchain Storage', color: 'green', delay: 2000 }
    ];
    
    const demoDiv = document.getElementById('encryption-demo');
    demoDiv.innerHTML = '';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `p-3 bg-slate-700 rounded border-l-4 border-${step.color}-500 fade-in`;
            stepDiv.innerHTML = `
                <div class="text-sm text-${step.color}-400">Step ${index + 1}: ${step.text}</div>
                <div class="text-xs text-slate-300 mt-1">Processing...</div>
            `;
            demoDiv.appendChild(stepDiv);
            
            if (index === steps.length - 1) {
                setTimeout(() => {
                    // Create NDA object
                    const nda = {
                        id: Date.now(),
                        title,
                        counterparty,
                        terms,
                        encryptedTerms: generateEncryptedText(terms),
                        status: 'pending',
                        createdAt: new Date().toISOString(),
                        auditTrail: [
                            { action: 'NDA Created', actor: '0x1234...5678', timestamp: new Date().toISOString() },
                            { action: 'Encrypted Storage', actor: 'fhEVM Coprocessor', timestamp: new Date().toISOString() }
                        ]
                    };
                    
                    demoNDAs.push(nda);
                    
                    // Show success
                    stepDiv.innerHTML = `
                        <div class="text-sm text-green-400">✅ NDA Created Successfully!</div>
                        <div class="text-xs text-slate-300 mt-1">ID: ${nda.id}</div>
                    `;
                    
                    // Update creator NDAs list
                    updateCreatorNDAs();
                }, 500);
            }
        }, step.delay);
    });
}

function generateEncryptedText(text) {
    const chars = '0123456789abcdef';
    return '0x' + Array.from({length: 64}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function updateCreatorNDAs() {
    const container = document.getElementById('creator-ndas');
    if (!container) return;
    
    container.innerHTML = demoNDAs.map(nda => `
        <div class="p-3 bg-slate-700 rounded-lg border border-slate-600">
            <div class="flex justify-between items-start">
                <div>
                    <div class="font-medium">${nda.title}</div>
                    <div class="text-sm text-slate-400">ID: ${nda.id}</div>
                </div>
                <span class="px-2 py-1 text-xs rounded ${getStatusColor(nda.status)}">${nda.status.toUpperCase()}</span>
            </div>
            <div class="mt-2 text-xs text-slate-400">
                Created: ${new Date(nda.createdAt).toLocaleString()}
            </div>
        </div>
    `).join('');
}

function getPendingNDAs() {
    const pending = demoNDAs.filter(nda => nda.status === 'pending');
    if (pending.length === 0) {
        return '<div class="text-slate-400 text-sm">No pending NDAs</div>';
    }
    
    return pending.map(nda => `
        <div class="p-4 bg-slate-700 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-600 transition"
             onclick="reviewNDA(${nda.id})">
            <div class="font-medium">${nda.title}</div>
            <div class="text-sm text-slate-400 mt-1">From: ${nda.counterparty.substring(0, 10)}...</div>
            <div class="text-xs text-slate-500 mt-2">Click to review and sign</div>
        </div>
    `).join('');
}

function getSignedNDAs() {
    const signed = demoNDAs.filter(nda => nda.status === 'signed');
    if (signed.length === 0) {
        return '<div class="text-slate-400 text-sm">No signed NDAs</div>';
    }
    
    return signed.map(nda => `
        <div class="p-3 bg-slate-700 rounded-lg border border-green-500">
            <div class="font-medium">${nda.title}</div>
            <div class="text-sm text-green-400">✅ Signed</div>
        </div>
    `).join('');
}

function getAuditNDAs() {
    if (demoNDAs.length === 0) {
        return '<div class="text-slate-400 text-sm">No NDAs available for audit</div>';
    }
    
    return demoNDAs.map(nda => `
        <div class="p-3 bg-slate-700 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-600 transition"
             onclick="showAuditTrail(${nda.id})">
            <div class="font-medium">${nda.title}</div>
            <div class="text-sm text-slate-400">Status: ${nda.status}</div>
        </div>
    `).join('');
}

function reviewNDA(ndaId) {
    const nda = demoNDAs.find(n => n.id === ndaId);
    if (!nda) return;
    
    // Simulate decryption process
    const demoDiv = document.getElementById('decryption-demo');
    const steps = [
        { text: 'Permission Verification', color: 'yellow' },
        { text: 'fhEVM Decryption', color: 'blue' },
        { text: 'Content Display', color: 'green' }
    ];
    
    demoDiv.innerHTML = '';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `p-3 bg-slate-700 rounded border-l-4 border-${step.color}-500 fade-in`;
            stepDiv.innerHTML = `
                <div class="text-sm text-${step.color}-400">${step.text}</div>
                <div class="text-xs text-slate-300 mt-1">Processing...</div>
            `;
            demoDiv.appendChild(stepDiv);
            
            if (index === steps.length - 1) {
                setTimeout(() => {
                    demoDiv.innerHTML += `
                        <div class="mt-4 p-4 bg-slate-600 rounded-lg fade-in">
                            <h4 class="font-medium mb-2">📄 Decrypted NDA Terms</h4>
                            <div class="text-sm text-slate-300 mb-3">${nda.terms}</div>
                            <button onclick="signNDA(${nda.id})" 
                                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
                                ✍️ Sign NDA
                            </button>
                        </div>
                    `;
                }, 500);
            }
        }, (index + 1) * 800);
    });
}

function signNDA(ndaId) {
    const nda = demoNDAs.find(n => n.id === ndaId);
    if (!nda) return;
    
    nda.status = 'signed';
    nda.signedAt = new Date().toISOString();
    nda.auditTrail.push({
        action: 'NDA Signed',
        actor: '0x742d...6C87',
        timestamp: new Date().toISOString()
    });
    
    // Refresh interface
    showInterface('counterparty');
    
    // Show success message
    setTimeout(() => {
        alert('✅ NDA signed successfully!');
    }, 100);
}

function showAuditTrail(ndaId) {
    const nda = demoNDAs.find(n => n.id === ndaId);
    if (!nda) return;
    
    const trailDiv = document.getElementById('audit-trail');
    trailDiv.innerHTML = `
        <div class="mb-4">
            <h4 class="font-medium">📄 ${nda.title}</h4>
            <div class="text-sm text-slate-400">ID: ${nda.id}</div>
        </div>
        ${nda.auditTrail.map((entry, index) => `
            <div class="p-3 bg-slate-700 rounded border-l-4 border-blue-500 fade-in">
                <div class="text-sm font-medium">${entry.action}</div>
                <div class="text-xs text-slate-400">Actor: ${entry.actor}</div>
                <div class="text-xs text-slate-500">${new Date(entry.timestamp).toLocaleString()}</div>
            </div>
        `).join('')}
    `;
}

function getStatusColor(status) {
    switch(status) {
        case 'pending': return 'bg-yellow-500 text-yellow-900';
        case 'signed': return 'bg-green-500 text-green-900';
        case 'expired': return 'bg-red-500 text-red-900';
        default: return 'bg-gray-500 text-gray-900';
    }
}

// Initialize demo
document.addEventListener('DOMContentLoaded', () => {
    showInterface('creator');
});