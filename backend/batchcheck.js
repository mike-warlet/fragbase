// Batch Code Checker API for FragBase
// Decodes perfume batch codes to show manufacture date and age
import { requireAuth } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Brand-specific batch code decoders
// Each brand has its own format for encoding manufacture dates
const BRAND_DECODERS = {
  // Dior, Chanel, Guerlain (LVMH group) - 4 digit: 1st = year, 2-3 = month, 4 = line
  dior: (code) => decodeLVMH(code),
  chanel: (code) => decodeLVMH(code),
  guerlain: (code) => decodeLVMH(code),
  givenchy: (code) => decodeLVMH(code),

  // L'Oreal group (YSL, Armani, Lancome, Valentino)
  'yves saint laurent': (code) => decodeLOreal(code),
  'giorgio armani': (code) => decodeLOreal(code),
  lancome: (code) => decodeLOreal(code),
  valentino: (code) => decodeLOreal(code),
  'ralph lauren': (code) => decodeLOreal(code),

  // Puig group (Carolina Herrera, Jean Paul Gaultier, Paco Rabanne)
  'carolina herrera': (code) => decodePuig(code),
  'jean paul gaultier': (code) => decodePuig(code),
  'paco rabanne': (code) => decodePuig(code),

  // Coty group (Hugo Boss, Calvin Klein, Gucci, Burberry, Marc Jacobs)
  'hugo boss': (code) => decodeCoty(code),
  'calvin klein': (code) => decodeCoty(code),
  gucci: (code) => decodeCoty(code),
  burberry: (code) => decodeCoty(code),
  'marc jacobs': (code) => decodeCoty(code),

  // Estee Lauder group (Tom Ford, Jo Malone, Le Labo)
  'tom ford': (code) => decodeEsteeLauder(code),
  'jo malone': (code) => decodeEsteeLauder(code),
  'le labo': (code) => decodeEsteeLauder(code),
  'estee lauder': (code) => decodeEsteeLauder(code),

  // Generic decoder for unknown brands
  _default: (code) => decodeGeneric(code),
};

function decodeLVMH(code) {
  if (!code || code.length < 4) return null;
  const yearDigit = parseInt(code[0]);
  if (isNaN(yearDigit)) return null;

  // Determine decade based on context (2020s for now)
  const baseYear = yearDigit >= 0 && yearDigit <= 6 ? 2020 : 2010;
  const year = baseYear + yearDigit;

  const monthCode = code.substring(1, 3);
  let month = parseInt(monthCode);
  if (isNaN(month) || month < 1 || month > 12) {
    // Try letter-based month
    month = monthCode.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  }
  if (month < 1 || month > 12) month = null;

  return { year, month, format: 'LVMH (YMML)' };
}

function decodeLOreal(code) {
  if (!code || code.length < 2) return null;

  // L'Oreal: first two chars are factory, then letter = year, digit = month
  // Or: first char is letter for year (A=2020, B=2021, etc.)
  const letterYear = code.match(/[A-Za-z]/);
  if (letterYear) {
    const idx = letterYear.index;
    const char = code[idx].toUpperCase();
    const year = 2020 + (char.charCodeAt(0) - 'A'.charCodeAt(0));
    if (year > 2030) return null;

    // Next digits might be day of year or month
    const rest = code.substring(idx + 1);
    const dayOfYear = parseInt(rest);
    let month = null;
    if (dayOfYear > 0 && dayOfYear <= 366) {
      month = Math.ceil(dayOfYear / 30.4);
      if (month > 12) month = 12;
    }
    return { year, month, format: "L'Oréal (Factory+YearLetter+Day)" };
  }
  return null;
}

function decodePuig(code) {
  if (!code || code.length < 4) return null;
  // Puig typically uses: first 2 digits = year, next 2 = week or month
  const yearDigits = parseInt(code.substring(0, 2));
  if (isNaN(yearDigits)) return null;

  const year = yearDigits < 50 ? 2000 + yearDigits : 1900 + yearDigits;
  const rest = parseInt(code.substring(2, 4));
  let month = null;
  if (rest >= 1 && rest <= 12) {
    month = rest;
  } else if (rest >= 1 && rest <= 52) {
    month = Math.ceil(rest / 4.33);
  }

  return { year, month, format: 'Puig (YYMM/WW)' };
}

function decodeCoty(code) {
  if (!code || code.length < 4) return null;
  // Coty: various formats, commonly first digit = year, 2nd-4th = day of year
  const yearDigit = parseInt(code[0]);
  if (isNaN(yearDigit)) return null;

  const year = 2020 + yearDigit;
  const dayStr = code.substring(1, 4);
  const dayOfYear = parseInt(dayStr);
  let month = null;
  if (dayOfYear > 0 && dayOfYear <= 366) {
    month = Math.ceil(dayOfYear / 30.4);
    if (month > 12) month = 12;
  }

  return { year, month, format: 'Coty (YDDD)' };
}

function decodeEsteeLauder(code) {
  if (!code || code.length < 3) return null;
  // EL: letter for month (A=Jan,...), digit for year, rest is production line
  const monthChar = code[0].toUpperCase();
  if (monthChar < 'A' || monthChar > 'Z') return null;

  let month = monthChar.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  if (month > 12) month = null;

  const yearDigit = parseInt(code[1]);
  if (isNaN(yearDigit)) return null;
  const year = 2020 + yearDigit;

  return { year, month, format: 'Estée Lauder (MY+line)' };
}

function decodeGeneric(code) {
  if (!code || code.length < 3) return null;
  // Try common patterns
  // Pattern 1: 4+ digits where first 2 = year
  const digits = code.replace(/[^0-9]/g, '');
  if (digits.length >= 4) {
    const yy = parseInt(digits.substring(0, 2));
    if (yy >= 15 && yy <= 30) {
      const year = 2000 + yy;
      const mm = parseInt(digits.substring(2, 4));
      const month = (mm >= 1 && mm <= 12) ? mm : null;
      return { year, month, format: 'Generic (YYMM...)' };
    }
  }
  // Pattern 2: single year digit + day of year
  if (digits.length >= 4) {
    const y = parseInt(digits[0]);
    const ddd = parseInt(digits.substring(1, 4));
    if (ddd > 0 && ddd <= 366) {
      const year = 2020 + y;
      const month = Math.ceil(ddd / 30.4);
      return { year, month: Math.min(month, 12), format: 'Generic (YDDD)' };
    }
  }
  return null;
}

function getAgeInfo(year, month) {
  const now = new Date();
  const mfgDate = new Date(year, (month || 6) - 1, 1);
  const ageMs = now - mfgDate;
  const ageMonths = Math.round(ageMs / (30.4 * 24 * 60 * 60 * 1000));
  const ageYears = Math.round(ageMonths / 12 * 10) / 10;

  let freshness = 'fresh';
  let freshness_label = 'Fresco';
  if (ageMonths > 60) { freshness = 'old'; freshness_label = 'Antigo (5+ anos)'; }
  else if (ageMonths > 36) { freshness = 'mature'; freshness_label = 'Maduro (3-5 anos)'; }
  else if (ageMonths > 18) { freshness = 'good'; freshness_label = 'Bom estado'; }

  return { age_months: ageMonths, age_years: ageYears, freshness, freshness_label };
}

const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// POST /api/batch-check — Decode a batch code
export async function handleBatchCheck(request, env) {
  try {
    const { brand, code } = await request.json();

    if (!code) return json({ error: 'Batch code is required' }, 400);

    const cleanCode = code.trim().toUpperCase();
    const brandLower = (brand || '').toLowerCase().trim();

    // Find decoder
    const decoder = BRAND_DECODERS[brandLower] || BRAND_DECODERS._default;
    const decoded = decoder(cleanCode);

    if (!decoded || !decoded.year) {
      return json({
        success: false,
        code: cleanCode,
        brand: brand || null,
        message: 'Não foi possível decodificar este batch code. Formato não reconhecido.',
      });
    }

    const age = getAgeInfo(decoded.year, decoded.month);
    const monthLabel = decoded.month ? MONTHS_PT[decoded.month - 1] : '?';

    return json({
      success: true,
      code: cleanCode,
      brand: brand || null,
      manufacture_date: {
        year: decoded.year,
        month: decoded.month,
        label: decoded.month ? `${monthLabel} ${decoded.year}` : `${decoded.year}`,
      },
      age: age,
      format: decoded.format,
      shelf_life_note: 'Perfumes tipicamente duram 3-5 anos se armazenados em local fresco e escuro.',
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// POST /api/batch-report — Report a suspicious batch code (authenticated)
export async function handleBatchReport(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { brand, code, reason } = await request.json();
    if (!brand || !code) return json({ error: 'Brand and code are required' }, 400);

    // For now, just acknowledge the report (future: store in DB for community analysis)
    return json({
      success: true,
      message: 'Denúncia recebida. Obrigado por ajudar a comunidade!',
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
