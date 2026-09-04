/* @ds-bundle: {"format":4,"namespace":"Nocturne_noctur","components":[{"name":"Badge","sourcePath":"components/actions/Badge.jsx"},{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"ButtonGroup","sourcePath":"components/actions/Button.jsx"},{"name":"StatusBadge","sourcePath":"components/actions/StatusBadge.jsx"},{"name":"STATUSES","sourcePath":"components/actions/StatusBadge.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"PersonCell","sourcePath":"components/data/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/data/Avatar.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"Money","sourcePath":"components/data/Money.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AppShell","sourcePath":"components/navigation/AppShell.jsx"},{"name":"PageHeader","sourcePath":"components/navigation/AppShell.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/actions/Badge.jsx":"51a2d6bcc3ea","components/actions/Button.jsx":"de8aba6a6c0e","components/actions/StatusBadge.jsx":"e00a29716fb9","components/data/Avatar.jsx":"ff5c3826ab1d","components/data/DataTable.jsx":"8912e442f026","components/data/Money.jsx":"fadc00bb656f","components/data/StatCard.jsx":"eedc36c63895","components/feedback/Alert.jsx":"284da8c3f9d8","components/feedback/EmptyState.jsx":"ac5e3d7aa280","components/feedback/Modal.jsx":"61d41d118a80","components/forms/Checkbox.jsx":"0d182c837733","components/forms/Input.jsx":"668f03139bd5","components/forms/SegmentedControl.jsx":"f63e75639eb0","components/forms/Select.jsx":"e1215179e3a5","components/forms/Switch.jsx":"7ac19e9bf831","components/navigation/AppShell.jsx":"efb82aa5d096","components/navigation/Stepper.jsx":"ff685e63f45b","components/navigation/Tabs.jsx":"884f403b0fec"},"inlinedExternals":[],"unexposedExports":[{"name":"formatMoney","sourcePath":"components/data/Money.jsx"}]} */

(() => {

const __ds_ns = (window.Nocturne_noctur = window.Nocturne_noctur || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = 'neutral',
  dot = true,
  square,
  children,
  className = '',
  ...rest
}) {
  const cls = ['badge', 'badge-' + tone, dot ? '' : 'badge-plain', square ? 'badge-square' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Badge.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  block,
  children,
  className = '',
  ...rest
}) {
  const cls = ['btn', 'btn-' + variant, size !== 'md' ? 'btn-' + size : '', children == null ? 'btn-icon' : '', block ? 'btn-block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), icon, children, iconRight);
}
function ButtonGroup({
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ('btn-group ' + className).trim()
  }, children);
}
Object.assign(__ds_scope, { Button, ButtonGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/StatusBadge.jsx
try { (() => {
const MAP = {
  draft: ['neutral', 'Draft'],
  locked: ['neutral', 'Locked'],
  exited: ['neutral', 'Exited'],
  custom: ['neutral', 'Custom'],
  processing: ['info', 'Processing'],
  approved: ['info', 'Approved'],
  generated: ['info', 'Generated'],
  system: ['info', 'System'],
  pending: ['warning', 'Pending approval'],
  notice: ['warning', 'On notice'],
  unverified: ['warning', 'Bank unverified'],
  trial: ['warning', 'Trial'],
  paid: ['success', 'Paid'],
  sent: ['success', 'Sent'],
  active: ['success', 'Active'],
  verified: ['success', 'Verified'],
  failed: ['danger', 'Failed'],
  overdue: ['danger', 'Overdue'],
  suspended: ['danger', 'Suspended'],
  rejected: ['danger', 'Rejected']
};
function StatusBadge({
  status,
  label,
  className = ''
}) {
  const m = MAP[status] || ['neutral', status];
  return /*#__PURE__*/React.createElement("span", {
    className: ('badge badge-' + m[0] + ' ' + className).trim()
  }, label || m[1]);
}
const STATUSES = Object.keys(MAP);
Object.assign(__ds_scope, { StatusBadge, STATUSES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initials(name = '') {
  const p = String(name).trim().split(/\s+/).filter(Boolean);
  return ((p[0] || '')[0] || '').concat((p[1] || '')[0] || '').toUpperCase();
}
function Avatar({
  name,
  src,
  size = 'md',
  className = '',
  ...rest
}) {
  const cls = ['avatar', size !== 'md' ? 'avatar-' + size : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || ''
  }) : initials(name));
}
function PersonCell({
  name,
  meta,
  src,
  size = 'md'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cell-person"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: name,
    src: src,
    size: size
  }), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, name), meta && /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, meta)));
}
function AvatarStack({
  people = [],
  max = 3
}) {
  const shown = people.slice(0, max),
    rest = people.length - shown.length;
  return /*#__PURE__*/React.createElement("span", {
    className: "avatar-stack"
  }, shown.map((p, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: i,
    name: typeof p === 'string' ? p : p.name,
    src: typeof p === 'string' ? undefined : p.src,
    size: "sm"
  })), rest > 0 && /*#__PURE__*/React.createElement("span", {
    className: "avatar avatar-sm",
    style: {
      background: 'var(--color-surface-inset)',
      color: 'var(--color-text-muted)'
    }
  }, "+", rest));
}
Object.assign(__ds_scope, { Avatar, PersonCell, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  selectable = false,
  rowKey,
  toolbar,
  footer,
  totalRow,
  emptyLabel = 'Nothing to show',
  onRowClick,
  className = ''
}) {
  const [sort, setSort] = React.useState(null);
  const [sel, setSel] = React.useState([]);
  const key = (r, i) => rowKey ? r[rowKey] : i;
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const c = columns.find(c => c.key === sort.key);
    const get = r => c && c.sortValue ? c.sortValue(r) : r[sort.key];
    return rows.slice().sort((a, b) => {
      const x = get(a),
        y = get(b);
      return (x > y ? 1 : x < y ? -1 : 0) * (sort.dir === 'asc' ? 1 : -1);
    });
  }, [rows, sort, columns]);
  const toggle = k => setSel(s => s.includes(k) ? s.filter(x => x !== k) : s.concat(k));
  const allOn = sel.length > 0 && sel.length === rows.length;
  return /*#__PURE__*/React.createElement("div", {
    className: ('table-wrap ' + className).trim()
  }, (toolbar || sel.length > 0) && /*#__PURE__*/React.createElement("div", {
    className: "table-toolbar"
  }, sel.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 'var(--text-sm)'
    }
  }, sel.length, " selected"), /*#__PURE__*/React.createElement("span", {
    className: "grow"
  })) : toolbar), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, selectable && /*#__PURE__*/React.createElement("th", {
    style: {
      width: 36
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: allOn,
    onChange: () => setSel(allOn ? [] : rows.map(key))
  }))), columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: [c.align === 'right' ? 'num' : '', c.sortable ? 'sortable' : ''].filter(Boolean).join(' '),
    style: c.width ? {
      width: c.width
    } : undefined,
    onClick: c.sortable ? () => setSort(s => ({
      key: c.key,
      dir: s && s.key === c.key && s.dir === 'asc' ? 'desc' : 'asc'
    })) : undefined
  }, c.header, c.sortable && /*#__PURE__*/React.createElement("span", {
    className: "caret"
  }, sort && sort.key === c.key ? sort.dir === 'asc' ? '\u2191' : '\u2193' : '\u2195'))))), /*#__PURE__*/React.createElement("tbody", null, sorted.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length + (selectable ? 1 : 0),
    style: {
      textAlign: 'center',
      color: 'var(--color-text-subtle)',
      height: 96
    }
  }, emptyLabel)), sorted.map((r, i) => {
    const k = key(r, i);
    return /*#__PURE__*/React.createElement("tr", {
      key: k,
      className: sel.includes(k) ? 'is-selected' : undefined,
      onClick: onRowClick ? () => onRowClick(r) : undefined,
      style: onRowClick ? {
        cursor: 'pointer'
      } : undefined
    }, selectable && /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("label", {
      className: "check"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: sel.includes(k),
      onChange: e => {
        e.stopPropagation();
        toggle(k);
      }
    }))), columns.map(c => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      className: c.align === 'right' ? 'num' : undefined
    }, c.render ? c.render(r) : r[c.key])));
  }), totalRow && /*#__PURE__*/React.createElement("tr", {
    className: "table-total"
  }, selectable && /*#__PURE__*/React.createElement("td", null), columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: c.align === 'right' ? 'num' : undefined
  }, totalRow[c.key])))))), footer && /*#__PURE__*/React.createElement("div", {
    className: "table-foot"
  }, footer));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/Money.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NF = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0
});
const NF2 = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
function formatMoney(value, opts) {
  const o = opts || {};
  const symbol = o.symbol !== false;
  const n = Number(value) || 0;
  const body = (o.paise ? NF2 : NF).format(Math.abs(n));
  return (n < 0 ? '-' : '') + (symbol ? '\u20b9' : '') + body;
}
function Money({
  value,
  paise = false,
  symbol = true,
  tone,
  className = '',
  ...rest
}) {
  const color = tone === 'negative' ? 'var(--danger-700)' : tone === 'positive' ? 'var(--success-700)' : undefined;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('num ' + className).trim(),
    style: {
      color
    }
  }, rest), formatMoney(value, {
    paise,
    symbol
  }));
}
Object.assign(__ds_scope, { formatMoney, Money });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Money.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatCard({
  label,
  value,
  delta,
  direction = 'flat',
  hint,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('stat ' + className).trim()
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    className: 'stat-delta delta-' + direction
  }, direction === 'up' ? '\u2191' : direction === 'down' ? '\u2193' : '', " ", delta), hint && /*#__PURE__*/React.createElement("div", {
    className: "hint",
    style: {
      marginTop: 4
    }
  }, hint));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function Alert({
  tone = 'info',
  title,
  children,
  actions,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ('alert alert-' + tone + ' ' + className).trim()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "alert-title"
  }, title), /*#__PURE__*/React.createElement("div", null, children)), actions && /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, actions));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function EmptyState({
  title,
  children,
  action,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ('empty ' + className).trim()
  }, /*#__PURE__*/React.createElement("h4", null, title), children && /*#__PURE__*/React.createElement("p", null, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function Modal({
  open = true,
  title,
  children,
  actions,
  onClose,
  width = 480,
  className = ''
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "dialog-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: ('dialog ' + className).trim(),
    style: {
      width: 'min(' + width + 'px,100%)'
    },
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dialog-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dialog-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost btn-sm btn-icon",
    onClick: onClose,
    "aria-label": "Close"
  }, "\\u00d7")), /*#__PURE__*/React.createElement("div", {
    className: "dialog-body"
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    className: "dialog-actions"
  }, actions)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  type = 'checkbox',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ('check ' + className).trim()
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, rest)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    className: "hint",
    style: {
      display: 'block'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  required,
  prefix,
  money,
  id,
  className = '',
  ...rest
}) {
  const fid = id || 'in-' + Math.random().toString(36).slice(2, 8);
  const cls = ['input', money ? 'input-money' : '', error ? 'input-invalid' : '', className].filter(Boolean).join(' ');
  const control = prefix ? /*#__PURE__*/React.createElement("div", {
    className: "input-affix"
  }, /*#__PURE__*/React.createElement("span", {
    className: "affix"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: cls
  }, rest))) : /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: cls
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    className: required ? 'label-req' : undefined
  }, label), control, error ? /*#__PURE__*/React.createElement("span", {
    className: "error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, hint) : null);
}
function Textarea({
  label,
  hint,
  error,
  required,
  id,
  className = '',
  ...rest
}) {
  const fid = id || 'ta-' + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    className: required ? 'label-req' : undefined
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    className: ('textarea ' + (error ? 'input-invalid ' : '') + className).trim()
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options = [],
  value,
  onChange,
  className = ''
}) {
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    className: ('seg ' + className).trim(),
    role: "tablist"
  }, opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "tab",
    className: "seg-opt",
    "aria-selected": o.value === value,
    onClick: () => onChange && onChange(o.value)
  }, o.label)));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  error,
  required,
  options = [],
  placeholder,
  id,
  className = '',
  ...rest
}) {
  const fid = id || 'se-' + Math.random().toString(36).slice(2, 8);
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    className: required ? 'label-req' : undefined
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: ('select ' + (error ? 'input-invalid ' : '') + className).trim()
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), error ? /*#__PURE__*/React.createElement("span", {
    className: "error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  description,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ('switch ' + className).trim(),
    style: {
      alignItems: description ? 'flex-start' : 'center'
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    className: "hint",
    style: {
      display: 'block'
    }
  }, description)));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppShell.jsx
try { (() => {
function AppShell({
  brand = 'Emplora',
  org,
  nav = [],
  active,
  topbar,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark"
  }, "E"), brand), org && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 8px 8px',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-subtle)'
    }
  }, org), nav.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, g.label && /*#__PURE__*/React.createElement("div", {
    className: "nav-group"
  }, g.label), /*#__PURE__*/React.createElement("div", {
    className: "stack gap-1"
  }, (g.items || []).map(it => /*#__PURE__*/React.createElement("a", {
    key: it.label,
    href: it.href || '#',
    className: 'nav-item' + (it.label === active ? ' is-active' : '')
  }, it.icon, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, it.count)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, footer)), /*#__PURE__*/React.createElement("main", {
    style: {
      minWidth: 0
    }
  }, topbar && /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, topbar), children));
}
function PageHeader({
  title,
  sub,
  actions,
  tabs
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-title"
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, sub)), actions && /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, actions)), tabs);
}
Object.assign(__ds_scope, { AppShell, PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppShell.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
function Stepper({
  steps = [],
  current = 0,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ('stepper ' + className).trim()
  }, steps.map((s, i) => {
    const label = typeof s === 'string' ? s : s.label;
    const state = i < current ? 'is-done' : i === current ? 'is-current' : '';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: label
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      className: "step-line"
    }), /*#__PURE__*/React.createElement("span", {
      className: ('step ' + state).trim()
    }, /*#__PURE__*/React.createElement("span", {
      className: "step-dot"
    }, i < current ? '\u2713' : i + 1), label));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  onChange,
  className = ''
}) {
  const items = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  return /*#__PURE__*/React.createElement("div", {
    className: ('tabs ' + className).trim(),
    role: "tablist"
  }, items.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    type: "button",
    role: "tab",
    className: "tab",
    "aria-selected": t.value === value,
    onClick: () => onChange && onChange(t.value)
  }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
    className: "muted num",
    style: {
      marginLeft: 6
    }
  }, t.count))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonGroup = __ds_scope.ButtonGroup;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.STATUSES = __ds_scope.STATUSES;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.PersonCell = __ds_scope.PersonCell;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Money = __ds_scope.Money;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AppShell = __ds_scope.AppShell;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
