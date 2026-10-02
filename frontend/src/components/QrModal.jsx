import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X, Download, Copy, Check, QrCode, Wifi, Globe, UserCheck,
  AlertCircle, Smartphone, ExternalLink
} from 'lucide-react';

export const QrModal = ({
  isOpen,
  onClose,
  portfolio,
  slug,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState('web'); // 'web' or 'vcard'
  const [hostChoice, setHostChoice] = useState('lan'); // 'lan', 'localhost', 'custom'
  const [lanIp, setLanIp] = useState('192.168.29.208');
  const [customHost, setCustomHost] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [copied, setCopied] = useState(false);

  // Fetch LAN IP from backend
  useEffect(() => {
    fetch('/api/public/portfolio/info/network')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.lanIp && data.data.lanIp !== '127.0.0.1') {
          setLanIp(data.data.lanIp);
        }
      })
      .catch(() => {});
  }, []);

  const currentPort = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const currentProto = typeof window !== 'undefined' ? window.location.protocol : 'http:';
  const targetSlug = slug || portfolio?.slug || 'student';

  // Compute final Web URL to encode
  let computedWebUrl = '';
  if (hostChoice === 'lan') {
    computedWebUrl = `${currentProto}//${lanIp}${currentPort}/portfolio/${targetSlug}`;
  } else if (hostChoice === 'localhost') {
    computedWebUrl = `${window.location.origin}/portfolio/${targetSlug}`;
  } else {
    // Custom domain
    let host = customHost.trim();
    if (host && !host.startsWith('http://') && !host.startsWith('https://')) {
      host = `https://${host}`;
    }
    computedWebUrl = host
      ? (host.endsWith('/') ? `${host}portfolio/${targetSlug}` : `${host}/portfolio/${targetSlug}`)
      : `${window.location.origin}/portfolio/${targetSlug}`;
  }

  // Generate vCard format text
  const generateVCard = () => {
    const fullName = portfolio?.fullName || 'Student';
    const email = portfolio?.email || '';
    const phone = portfolio?.phone || '';
    const headline = portfolio?.headline || 'Student';
    const location = portfolio?.location || '';
    const url = computedWebUrl;

    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fullName}`,
      `TITLE:${headline}`,
      email ? `EMAIL;TYPE=INTERNET:${email}` : '',
      phone ? `TEL;TYPE=CELL:${phone}` : '',
      location ? `ADR;TYPE=HOME:;;${location};;;;` : '',
      `URL:${url}`,
      portfolio?.bio ? `NOTE:${portfolio.bio.substring(0, 150)}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');
  };

  // Generate QR Code on canvas/dataURL whenever mode or url changes
  useEffect(() => {
    const textToEncode = mode === 'web' ? computedWebUrl : generateVCard();
    setEncodedText(textToEncode);

    QRCode.toDataURL(textToEncode, {
      width: 320,
      margin: 2,
      color: {
        dark: '#1e293b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation failed:', err));
  }, [mode, hostChoice, lanIp, customHost, computedWebUrl, portfolio, targetSlug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(encodedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLocalhost = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-50 text-brand-600 rounded-xl">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Portfolio QR Code</h3>
              <p className="text-xs text-slate-500">Scan with your phone to view instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs: Web Link vs Digital Contact Card */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setMode('web')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mode === 'web'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-brand-600" />
            Web Portfolio Link
          </button>

          <button
            type="button"
            onClick={() => setMode('vcard')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mode === 'vcard'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            Contact & Resume Card
          </button>
        </div>

        {/* Web Mode Network Config */}
        {mode === 'web' && isLocalhost && (
          <div className="mb-4 bg-brand-50/70 p-3.5 rounded-2xl border border-brand-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-brand-900 mb-2">
              <Smartphone className="w-4 h-4 text-brand-600" />
              <span>Scanning with a mobile phone?</span>
            </div>
            <p className="text-brand-800 leading-snug mb-2.5">
              Phone cameras cannot reach <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px]">localhost</code> directly. Use your Wi-Fi network IP so your phone loads the page:
            </p>

            <div className="flex flex-wrap gap-1.5 mb-2">
              <button
                type="button"
                onClick={() => setHostChoice('lan')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  hostChoice === 'lan'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-brand-700 border border-brand-200'
                }`}
              >
                Wi-Fi IP ({lanIp})
              </button>

              <button
                type="button"
                onClick={() => setHostChoice('localhost')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  hostChoice === 'localhost'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-brand-700 border border-brand-200'
                }`}
              >
                localhost (PC only)
              </button>

              <button
                type="button"
                onClick={() => setHostChoice('custom')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  hostChoice === 'custom'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-brand-700 border border-brand-200'
                }`}
              >
                Custom Domain
              </button>
            </div>

            {hostChoice === 'custom' && (
              <input
                type="text"
                value={customHost}
                onChange={(e) => setCustomHost(e.target.value)}
                placeholder="e.g. https://myportfolio.vercel.app"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-200 rounded-lg outline-none"
              />
            )}
          </div>
        )}

        {/* vCard explanation notice */}
        {mode === 'vcard' && (
          <div className="mb-4 bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-800">
            <span className="font-bold flex items-center gap-1 mb-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              Works on ANY phone camera (100% offline)
            </span>
            Scanning this QR opens a native contact card on iOS/Android with your full name, headline, phone, email, and live website link.
          </div>
        )}

        {/* QR Code Display Canvas */}
        <div className="text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner mb-3">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Portfolio QR Code"
                className="w-52 h-52 mx-auto rounded-lg shadow-xs"
              />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}
          </div>

          {/* Encoded preview */}
          <div className="text-[11px] font-mono text-slate-600 bg-slate-100 p-2 rounded-xl truncate mb-4 max-w-sm mx-auto select-all">
            {mode === 'web' ? computedWebUrl : `${portfolio?.fullName || 'Student'} Contact Card`}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-2">
            <a
              href={qrDataUrl}
              download={`${targetSlug}-qr.png`}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download PNG
            </a>

            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>

            {mode === 'web' && (
              <a
                href={computedWebUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
                title="Open Link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
