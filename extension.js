const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const SNIPPET_LIST = [
  // JavaScript Dasar
  { label: '$(symbol-variable) edu-var',          description: 'Variabel dasar',              prefix: 'edu-var',               kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(git-branch) edu-if',                description: 'If statement',                prefix: 'edu-if',                kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(list-unordered) edu-switch',        description: 'Switch case',                 prefix: 'edu-switch',            kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(sync) edu-loop-for',                description: 'Loop for',                    prefix: 'edu-loop-for',          kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(sync) edu-while',                   description: 'While loop',                  prefix: 'edu-while',             kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(sync) edu-do-while',                description: 'Do while',                    prefix: 'edu-do-while',          kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(debug-step-over) edu-break-continue', description: 'Break & continue',          prefix: 'edu-break-continue',    kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(array) edu-array',                  description: 'Array dasar',                 prefix: 'edu-array',             kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(array) edu-array-access',           description: 'Akses array',                 prefix: 'edu-array-access',      kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(array) edu-array-pushpop',          description: 'Push & pop array',            prefix: 'edu-array-pushpop',     kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(array) edu-array-foreach',          description: 'forEach loop',                prefix: 'edu-array-foreach',     kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-method) edu-func',           description: 'Function dasar',              prefix: 'edu-func',              kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-method) edu-func-return',    description: 'Function return',             prefix: 'edu-func-return',       kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-method) edu-arrow',          description: 'Arrow function',              prefix: 'edu-arrow',             kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-keyword) edu-datatype',      description: 'Tipe data',                   prefix: 'edu-datatype',          kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-object) edu-object',         description: 'Object',                      prefix: 'edu-object',            kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-operator) edu-operator-arit',    description: 'Operator aritmatika',     prefix: 'edu-operator-arit',     kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-operator) edu-operator-banding', description: 'Operator perbandingan',   prefix: 'edu-operator-banding',  kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-operator) edu-operator-logika',  description: 'Operator logika',         prefix: 'edu-operator-logika',   kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(symbol-array) edu-map',             description: 'Array map',                   prefix: 'edu-map',               kategori: 'JavaScript Dasar',    lang: 'javascript' },
  { label: '$(filter) edu-filter',                description: 'Array filter',                prefix: 'edu-filter',            kategori: 'JavaScript Dasar',    lang: 'javascript' },

  // JavaScript Advanced
  { label: '$(symbol-class) edu-js-class',        description: 'Class ES6 + inheritance',     prefix: 'edu-js-class',          kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(zap) edu-promise',                  description: 'Promise dasar',               prefix: 'edu-promise',           kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(zap) edu-async',                    description: 'Async/await',                 prefix: 'edu-async',             kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(zap) edu-promise-chain',            description: 'Promise chaining',            prefix: 'edu-promise-chain',     kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(zap) edu-promise-all',              description: 'Promise.all (parallel)',      prefix: 'edu-promise-all',       kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(symbol-object) edu-destructure-obj', description: 'Destructuring object',       prefix: 'edu-destructure-obj',   kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(array) edu-destructure-arr',        description: 'Destructuring array',         prefix: 'edu-destructure-arr',   kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(expand-all) edu-spread',            description: 'Spread operator',             prefix: 'edu-spread',            kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(collapse-all) edu-rest',            description: 'Rest parameter',              prefix: 'edu-rest',              kategori: 'JavaScript Advanced', lang: 'javascript' },
  { label: '$(quote) edu-template',               description: 'Template literals',           prefix: 'edu-template',          kategori: 'JavaScript Advanced', lang: 'javascript' },

  // PHP Dasar
  { label: '$(symbol-variable) edu-var',          description: 'Variabel dasar',              prefix: 'edu-var',               kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(git-branch) edu-if',                description: 'If statement',                prefix: 'edu-if',                kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(list-unordered) edu-switch',        description: 'Switch case',                 prefix: 'edu-switch',            kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(sync) edu-loop-for',                description: 'Loop for',                    prefix: 'edu-loop-for',          kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(sync) edu-while',                   description: 'While loop',                  prefix: 'edu-while',             kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(sync) edu-do-while',                description: 'Do while',                    prefix: 'edu-do-while',          kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(sync) edu-foreach',                 description: 'Foreach loop',                prefix: 'edu-foreach',           kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(debug-step-over) edu-break-continue', description: 'Break & continue',          prefix: 'edu-break-continue',    kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(array) edu-array',                  description: 'Array dasar',                 prefix: 'edu-array',             kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(array) edu-array-access',           description: 'Akses array',                 prefix: 'edu-array-access',      kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(array) edu-array-pushpop',          description: 'Push & pop array',            prefix: 'edu-array-pushpop',     kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-method) edu-func',           description: 'Function dasar',              prefix: 'edu-func',              kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-method) edu-func-return',    description: 'Function return',             prefix: 'edu-func-return',       kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-method) edu-arrow',          description: 'Arrow function (fn)',         prefix: 'edu-arrow',             kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-keyword) edu-datatype',      description: 'Tipe data',                   prefix: 'edu-datatype',          kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-object) edu-object',         description: 'Associative array',           prefix: 'edu-object',            kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-operator) edu-operator-arit',    description: 'Operator aritmatika',     prefix: 'edu-operator-arit',     kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-operator) edu-operator-banding', description: 'Operator perbandingan',   prefix: 'edu-operator-banding',  kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-operator) edu-operator-logika',  description: 'Operator logika',         prefix: 'edu-operator-logika',   kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(symbol-array) edu-map',             description: 'Array map',                   prefix: 'edu-map',               kategori: 'PHP Dasar',           lang: 'php' },
  { label: '$(filter) edu-filter',                description: 'Array filter',                prefix: 'edu-filter',            kategori: 'PHP Dasar',           lang: 'php' },

  // PHP OOP
  { label: '$(symbol-class) edu-php-class',       description: 'Class dasar',                 prefix: 'edu-php-class',         kategori: 'PHP OOP',             lang: 'php' },
  { label: '$(symbol-class) edu-php-construct',   description: 'Constructor',                 prefix: 'edu-php-construct',     kategori: 'PHP OOP',             lang: 'php' },
  { label: '$(lock) edu-php-encap',               description: 'Encapsulation (getter/setter)', prefix: 'edu-php-encap',       kategori: 'PHP OOP',             lang: 'php' },
  { label: '$(type-hierarchy) edu-php-inherit',   description: 'Inheritance',                 prefix: 'edu-php-inherit',       kategori: 'PHP OOP',             lang: 'php' },
  { label: '$(symbol-interface) edu-php-poly',    description: 'Polymorphism',                prefix: 'edu-php-poly',          kategori: 'PHP OOP',             lang: 'php' },
  { label: '$(symbol-interface) edu-php-interface', description: 'Interface',                 prefix: 'edu-php-interface',     kategori: 'PHP OOP',             lang: 'php' },
  { label: '$(symbol-interface) edu-php-abstract', description: 'Abstract class',             prefix: 'edu-php-abstract',      kategori: 'PHP OOP',             lang: 'php' },

  // PHP Advanced
  { label: '$(package) edu-namespace',            description: 'Namespace dasar',             prefix: 'edu-namespace',         kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(package) edu-use',                  description: 'Use statement',               prefix: 'edu-use',               kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(shield) edu-try-catch',             description: 'Try-catch error handling',    prefix: 'edu-try-catch',         kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(shield) edu-custom-exception',      description: 'Custom exception class',      prefix: 'edu-custom-exception',  kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(database) edu-pdo-connect',         description: 'PDO database connection',     prefix: 'edu-pdo-connect',       kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(database) edu-pdo-select',          description: 'PDO SELECT query',            prefix: 'edu-pdo-select',        kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(database) edu-pdo-insert',          description: 'PDO INSERT data',             prefix: 'edu-pdo-insert',        kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(database) edu-pdo-update',          description: 'PDO UPDATE & DELETE',         prefix: 'edu-pdo-update',        kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(database) edu-pdo-transaction',     description: 'PDO transaction',             prefix: 'edu-pdo-transaction',   kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(extensions) edu-trait',             description: 'Trait dasar',                 prefix: 'edu-trait',             kategori: 'PHP Advanced',        lang: 'php' },
  { label: '$(extensions) edu-trait-multiple',    description: 'Multiple traits',             prefix: 'edu-trait-multiple',    kategori: 'PHP Advanced',        lang: 'php' },

];

// ======================================================
// LOAD SNIPPET BODY DARI FILE JSON
// ======================================================
function loadSnippetBodies(extensionPath) {
  const files = {
    javascript: ['javascript.json', 'javascript-advanced.json'],
    php: ['php.json', 'php-oop.json'],
  };

  const bodies = {}; // key: "prefix_lang"

  for (const [langKey, fileList] of Object.entries(files)) {
    for (const fileName of fileList) {
      const filePath = path.join(extensionPath, 'snippets', fileName);
      if (!fs.existsSync(filePath)) continue;

      const raw = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(raw);

      for (const snippet of Object.values(data)) {
        const key = `${snippet.prefix}_${langKey}`;
        bodies[key] = snippet.body;
      }
    }
  }

  return bodies;
}

// ======================================================
// RESOLVE BODY SNIPPET — cari berdasarkan prefix + lang
// ======================================================
function resolveBody(bodies, prefix, lang) {
  // Coba exact match dulu (mis. edu-var_javascript)
  if (bodies[`${prefix}_${lang}`]) return bodies[`${prefix}_${lang}`];
}

// ======================================================
// KONVERSI BODY ARRAY → SNIPPET STRING
// Hapus tab stops ${N:default} → pakai default value saja
// ======================================================
function bodyToSnippetString(bodyLines) {
  return bodyLines.join('\n');
}

// ======================================================
// FILTER SNIPPET SESUAI BAHASA FILE YANG AKTIF
// ======================================================
function filterByLanguage(currentLang) {
  return SNIPPET_LIST.filter(item => {
    if (item.lang === 'javascript' && currentLang === 'javascript') return true;
    if (item.lang === 'php' && currentLang === 'php') return true;
    return false;
  });
}

// ======================================================
// AKTIVASI EXTENSION
// ======================================================
function activate(context) {

  // Preload semua snippet bodies
  const snippetBodies = loadSnippetBodies(context.extensionPath);

  // --------------------------------------------------
  // COMMAND: Lihat & Insert Snippet via QuickPick
  // --------------------------------------------------
  const showSnippetPicker = vscode.commands.registerCommand(
    'edu-snippet.showSnippetList',
    async function () {
      const editor = vscode.window.activeTextEditor;

      // Deteksi bahasa file aktif
      const currentLang = editor ? editor.document.languageId : null;
      const isSupported = currentLang === 'javascript' || currentLang === 'php';

      // Filter snippet sesuai bahasa, atau tampilkan semua jika bukan JS/PHP
      const filtered = isSupported
        ? filterByLanguage(currentLang)
        : SNIPPET_LIST;

      // Kelompokkan dengan separator per kategori
      const items = [];
      let lastKategori = '';

      for (const item of filtered) {
        if (item.kategori !== lastKategori) {
          items.push({
            label: item.kategori,
            kind: vscode.QuickPickItemKind.Separator,
          });
          lastKategori = item.kategori;
        }
        items.push({
          label: item.label,
          description: item.description,
          detail: isSupported
            ? `$(file-code) Insert ke file ${currentLang === 'javascript' ? 'JavaScript' : 'PHP'} aktif`
            : `$(info) Buka file .js atau .php untuk insert otomatis`,
          _prefix: item.prefix,
          _lang: item.lang,
        });
      }

      const picked = await vscode.window.showQuickPick(items, {
        placeHolder: isSupported
          ? `Pilih snippet untuk dimasukkan ke file ${currentLang} aktif...`
          : 'Pilih snippet — buka file .js atau .php untuk insert otomatis',
        matchOnDescription: true,
        matchOnDetail: false,
      });

      if (!picked || !picked._prefix) return;

      // Jika tidak ada editor aktif atau bukan JS/PHP, beri tahu user
      if (!editor || !isSupported) {
        vscode.window.showWarningMessage(
          `Buka file .js atau .php terlebih dahulu untuk menggunakan snippet "${picked._prefix}".`
        );
        return;
      }

      // Resolve body snippet
      const langKey = currentLang;
      const body = resolveBody(snippetBodies, picked._prefix, langKey);

      if (!body) {
        vscode.window.showErrorMessage(`Snippet "${picked._prefix}" tidak ditemukan.`);
        return;
      }

      // Insert snippet ke posisi kursor dengan tab stops aktif
      const snippetString = new vscode.SnippetString(bodyToSnippetString(body));
      await editor.insertSnippet(snippetString);

      vscode.window.showInformationMessage(
        `✅ Snippet "${picked._prefix}" berhasil dimasukkan!`
      );
    }
  );

  context.subscriptions.push(showSnippetPicker);
}

function deactivate() {}

module.exports = { activate, deactivate };
