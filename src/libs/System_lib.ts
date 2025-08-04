export const number_format = (
  number: number,
  decimals?: number,
  dec_point: string = '.',
  thousands_sep: string = ','
): string => {
  const n = isFinite(+number) ? +number : 0;
  const prec = isFinite(decimals ?? 0) ? Math.abs(decimals ?? 0) : 0;
  const sep = thousands_sep;
  const dec = dec_point;

  const toFixedFix = (n: number, prec: number): string => {
    const k = Math.pow(10, prec);
    return (Math.round(n * k) / k).toFixed(prec);
  };

  let s = (prec > 0) ? toFixedFix(n, prec) : Math.round(n).toString();

  const abs = toFixedFix(Math.abs(n), prec);
  let intPart = s.split('.')[0];

  if (Math.abs(n) >= 1000) {
    const i = intPart.length % 3 || 3;
    intPart = intPart.slice(0, i) + intPart.slice(i).replace(/(\d{3})/g, sep + '$1');
    s = intPart + (prec ? dec + s.split('.')[1] : '');
  } else if (prec > 0 && s.indexOf('.') !== -1) {
    s = s.replace('.', dec);
  } else if (prec > 0) {
    s += dec + '0'.repeat(prec);
  }

  const decPos = s.indexOf(dec);
  if (prec >= 1 && decPos !== -1 && s.length - decPos - 1 < prec) {
    s += '0'.repeat(prec - (s.length - decPos - 1));
  }

  return s;
};


const ChuSo = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const Tien = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

function docSo3ChuSo(baso: number): string {
  let tram = Math.floor(baso / 100);
  let chuc = Math.floor((baso % 100) / 10);
  let donvi = baso % 10;
  let ketQua = '';

  if (tram !== 0) {
    ketQua += ChuSo[tram] + ' trăm';
    if (chuc === 0 && donvi !== 0) ketQua += ' linh';
  }

  if (chuc !== 0 && chuc !== 1) {
    ketQua += ' ' + ChuSo[chuc] + ' mươi';
    if (donvi === 1) ketQua += ' mốt';
    else if (donvi === 5) ketQua += ' lăm';
    else if (donvi !== 0) ketQua += ' ' + ChuSo[donvi];
  } else if (chuc === 1) {
    ketQua += ' mười';
    if (donvi === 1) ketQua += ' một';
    else if (donvi === 5) ketQua += ' lăm';
    else if (donvi !== 0) ketQua += ' ' + ChuSo[donvi];
  } else if (chuc === 0 && donvi !== 0) {
    ketQua += ' ' + ChuSo[donvi];
  }

  return ketQua.trim();
}

export const numberToVietnameseWords = (num: number): string => {
  if (num === 0) return 'Không';

  let so = num;
  let chuoi = '';
  let i = 0;

  while (so > 0) {
    const phanBaSo = so % 1000;
    if (phanBaSo !== 0) {
      const doc = docSo3ChuSo(phanBaSo);
      chuoi = doc + ' ' + Tien[i] + ' ' + chuoi;
    }
    so = Math.floor(so / 1000);
    i++;
  }

  return chuoi.replace(/\s+/g, ' ').trim().replace(/^\w/, c => c.toUpperCase());
};