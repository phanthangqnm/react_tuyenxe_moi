const formatDateVietnamese = (input: string) => {
    const [day, month, year] = input.split('/').map(Number);
    return `Hôm nay, ngày ${day} tháng ${month} năm ${year}`;
};


const updateSpanContent = (html: string, newText: string, elementId: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html'); // bọc trong div để giữ đúng cấu trúc
    const span = doc.querySelector('#' + elementId);
    if (span) {
        span.textContent = newText;

    }

    return doc.body.firstChild
};

const updateSpanTitleModal = (idTitle: string) => {
    let title = '';
    if ((idTitle) === 'sohopdong') {
        title = "Số hợp đồng"
    } else if ((idTitle) === 'datehopdong') {
        title = "Ngày tháng hợp đồng"
    } else if ((idTitle) === 'thongtinthuexe') {
        title = "Thông tin bên thuê xe"
    }
    return title
};

const updateMultipleSpans = (html: string, updates: Record<string, string>) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');

    Object.entries(updates).forEach(([id, content]) => {
        const span = doc.querySelector(`#${id}`);
        if (span) span.innerHTML = content;
    });

    return doc.body.querySelector('div')?.innerHTML || '';
};

const updateMultipleSpanDataValues = (
    html: string,
    updates: Record<string, string>
): string | Number => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');

    Object.entries(updates).forEach(([id, dataValue]) => {
        const span = doc.querySelector(`#${id}`);
        if (span) {
            span.setAttribute('data-value', dataValue);
        }
    });

    return doc.body.querySelector('div')?.innerHTML || '';
};

type SpanUpdate = {
    innerHTML?: string;
    dataValue?: string;
};

const updateMultipleSpansFull = (
    html: string,
    updates: Record<string, SpanUpdate>
): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');

    Object.entries(updates).forEach(([id, update]) => {
        const span = doc.querySelector(`#${id}`);
        if (span) {
            if (update.innerHTML !== undefined) {
                span.innerHTML = update.innerHTML;
            }
            if (update.dataValue !== undefined) {
                span.setAttribute('data-value', update.dataValue);
            }
        }
    });

    return doc.body.querySelector('div')?.innerHTML || '';
};


const ex = {
    formatDateVietnamese,
    updateSpanContent,
    updateSpanTitleModal,
    updateMultipleSpans,
    updateMultipleSpanDataValues,
    updateMultipleSpansFull
}
export default ex