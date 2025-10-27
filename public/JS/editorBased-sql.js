const DEFAULT_SQL = `-- Truy vấn dữ liệu mẫu
-- Các bảng có sẵn: students, courses, enrollments

-- Xem tất cả sinh viên
SELECT * FROM students;
`;

let db = null;
let dbReady = false;

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
  },
});

async function initDatabase() {
  try {
    const SQL = await initSqlJs({
      locateFile: (file) =>
        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
    });

    db = new SQL.Database();
    db.run(`
      -- Bảng sinh viên
      CREATE TABLE students (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        department TEXT,
        email TEXT
      );
      
      -- Bảng môn học
      CREATE TABLE courses (
        id INTEGER PRIMARY KEY,
        course_code TEXT NOT NULL,
        course_name TEXT NOT NULL,
        credits INTEGER
      );
      
      -- Bảng đăng ký học
      CREATE TABLE enrollments (
        id INTEGER PRIMARY KEY,
        student_id INTEGER,
        course_id INTEGER,
        grade REAL,
        semester TEXT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );
    `);
    db.run(`
      INSERT INTO students (id, name, age, department, email) VALUES
      (1, 'Alice Johnson', 20, 'Computer Science', 'alice@university.edu'),
      (2, 'Bob Smith', 21, 'Computer Science', 'bob@university.edu'),
      (3, 'Charlie Brown', 19, 'Mathematics', 'charlie@university.edu'),
      (4, 'Diana Prince', 22, 'Physics', 'diana@university.edu'),
      (5, 'Eve Wilson', 20, 'Computer Science', 'eve@university.edu'),
      (6, 'Frank Miller', 23, 'Mathematics', 'frank@university.edu'),
      (7, 'Grace Lee', 21, 'Physics', 'grace@university.edu'),
      (8, 'Henry Zhang', 20, 'Computer Science', 'henry@university.edu');
    `);
    db.run(`
      INSERT INTO courses (id, course_code, course_name, credits) VALUES
      (1, 'CS101', 'Introduction to Programming', 3),
      (2, 'CS201', 'Data Structures', 4),
      (3, 'MATH101', 'Calculus I', 4),
      (4, 'MATH201', 'Linear Algebra', 3),
      (5, 'PHY101', 'Physics I', 4),
      (6, 'CS301', 'Database Systems', 3);
    `);

    db.run(`
      INSERT INTO enrollments (id, student_id, course_id, grade, semester) VALUES
      (1, 1, 1, 3.8, 'Fall 2023'),
      (2, 1, 2, 3.5, 'Spring 2024'),
      (3, 1, 6, 3.9, 'Spring 2024'),
      (4, 2, 1, 3.2, 'Fall 2023'),
      (5, 2, 2, 3.0, 'Spring 2024'),
      (6, 3, 3, 3.7, 'Fall 2023'),
      (7, 3, 4, 3.6, 'Spring 2024'),
      (8, 4, 5, 3.9, 'Fall 2023'),
      (9, 5, 1, 4.0, 'Fall 2023'),
      (10, 5, 2, 3.8, 'Spring 2024'),
      (11, 6, 3, 3.5, 'Fall 2023'),
      (12, 7, 5, 3.4, 'Fall 2023'),
      (13, 8, 1, 3.6, 'Fall 2023'),
      (14, 8, 6, 3.7, 'Spring 2024');
    `);

    dbReady = true;
    return true;
  } catch (err) {
    console.error("Failed to initialize database:", err);
    return false;
  }
}

require(["vs/editor/editor.main"], async function () {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  const editor = monaco.editor.create(editorContainer, {
    value: DEFAULT_SQL,
    language: "sql",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
  });
  
  updatePreviewWithMessage("⏳ Đang khởi tạo database...", "#4EC9B0");

  // Load database
  const dbLoaded = await initDatabase();

  if (dbLoaded) {
    updatePreviewWithMessage(
      "✅ Database đã sẵn sàng!\n\n📊 Các bảng có sẵn:\n- students (8 sinh viên)\n- courses (6 môn học)\n- enrollments (14 đăng ký)\n\nNhập SQL query và:\n- Đợi 1 giây → tự chạy\n- Hoặc nhấn Ctrl+S để chạy ngay",
      "white"
    );
    setTimeout(() => executeQuery(), 500);
  } else {
    updatePreviewWithMessage("❌ Không thể khởi tạo database", "#f48771");
  }

  function executeQuery() {
  if (!dbReady) {
    updatePreviewWithMessage("⏳ Database chưa sẵn sàng...", "#4EC9B0");
    return;
  }
  const query = editor.getValue().trim();
  if (!query) {
    updatePreviewWithMessage("⚠️ Vui lòng nhập SQL query", "#FFA500");
    return;
  }

  try {
    const cleanQuery = query
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');
    
    const statements = cleanQuery
      .split(";")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    let results = [];

    for (let stmt of statements) {
      const result = db.exec(stmt);
      if (result.length > 0) {
        results.push({ statement: stmt, data: result[0] });
      } else {
        results.push({
          statement: stmt,
          data: null,
          message: "Query executed successfully",
        });
      }
    }

    if (results.length === 0) {
      updatePreviewWithMessage("✅ Query executed (no results)", "white");
    } else {
      displayResults(results);
    }
  } catch (err) {
    updatePreviewWithMessage("❌ SQL Error:\n\n" + err.message, "#f48771");
  }
}

  function displayResults(results) {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      background: #1e1e1e;
      color: #d4d4d4;
      margin: 0;
    }
    .result-section {
      margin-bottom: 30px;
    }
    .statement {
      background: #2d2d30;
      padding: 10px 15px;
      border-radius: 4px;
      margin-bottom: 10px;
      font-family: 'Consolas', monospace;
      font-size: 13px;
      color: #4EC9B0;
    }
    .message {
      color: #16825d;
      padding: 10px;
      font-style: italic;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #252526;
      border-radius: 4px;
      overflow: hidden;
    }
    th {
      background: #0e639c;
      color: white;
      padding: 12px 15px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 2px solid #1177bb;
    }
    td {
      padding: 10px 15px;
      border-bottom: 1px solid #3e3e42;
      font-size: 13px;
    }
    tr:hover {
      background: #2d2d30;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .row-count {
      margin-top: 10px;
      color: #858585;
      font-size: 12px;
      font-style: italic;
    }
    .no-results {
      padding: 20px;
      text-align: center;
      color: #858585;
      font-style: italic;
    }
  </style>
</head>
<body>`;

    for (let result of results) {
      html += `<div class="result-section">`;
      html += `<div class="statement">${escapeHtml(result.statement)}</div>`;

      if (result.data) {
        const { columns, values } = result.data;

        if (values.length === 0) {
          html += `<div class="no-results">No results found</div>`;
        } else {
          html += `<table><thead><tr>`;
          columns.forEach((col) => {
            html += `<th>${escapeHtml(col)}</th>`;
          });
          html += `</tr></thead><tbody>`;

          values.forEach((row) => {
            html += `<tr>`;
            row.forEach((cell) => {
              html += `<td>${
                cell === null ? "<i>NULL</i>" : escapeHtml(String(cell))
              }</td>`;
            });
            html += `</tr>`;
          });

          html += `</tbody></table>`;
          html += `<div class="row-count">${values.length} row(s) returned</div>`;
        }
      } else if (result.message) {
        html += `<div class="message">✅ ${result.message}</div>`;
      }

      html += `</div>`;
    }

    html += `</body></html>`;
    previewFrame.srcdoc = html;
  }

  // Helper function
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function updatePreviewWithMessage(message, color = "white") {
    const escapedMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    previewFrame.srcdoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Consolas', 'Courier New', monospace;
      padding: 20px;
      background: #1e1e1e;
      color: ${color};
      margin: 0;
      line-height: 1.6;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <pre>${escapedMessage}</pre>
</body>
</html>`;
  }

  let timeout;
  editor.onDidChangeModelContent(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (dbReady) {
        executeQuery();
      }
    }, 1000);
  });


  window.addEventListener("keydown", (e) => {
    const mod = navigator.platform.includes("Mac") ? e.metaKey : e.ctrlKey;
    if (mod && e.key === "s") {
      e.preventDefault();
      if (dbReady) {
        executeQuery();
        const orig = previewFrame.style.boxShadow;
        previewFrame.style.boxShadow = "0 0 8px rgba(0,200,0,0.7)";
        setTimeout(() => (previewFrame.style.boxShadow = orig), 300);
      }
    }
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    if (dbReady) {
      executeQuery();
    }
  });

  monaco.languages.registerCompletionItemProvider("sql", {
    provideCompletionItems: () => ({
      suggestions: [
        {
          label: "SELECT",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "SELECT ${1:*} FROM ${2:table}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "INSERT",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText:
            "INSERT INTO ${1:table} (${2:columns}) VALUES (${3:values})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "UPDATE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText:
            "UPDATE ${1:table} SET ${2:column} = ${3:value} WHERE ${4:condition}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "DELETE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "DELETE FROM ${1:table} WHERE ${2:condition}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "JOIN",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "JOIN ${1:table} ON ${2:condition}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "WHERE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "WHERE ${1:condition}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "GROUP BY",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "GROUP BY ${1:column}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "ORDER BY",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "ORDER BY ${1:column} ${2|ASC,DESC|}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "students",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "students",
          detail: "Table",
        },
        {
          label: "courses",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "courses",
          detail: "Table",
        },
        {
          label: "enrollments",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "enrollments",
          detail: "Table",
        },
      ],
    }),
  });

  window.editorBased = {
    editor,
    executeQuery,
    getDatabase: () => db,
    isReady: () => dbReady,
  };
});
