function cleanText(text) {
    return text
        .replace(/\s+/g, " ")
        .trim();
}

function truncateText(text, maxLength) {
    return text.length <= maxLength
        ? text
        : `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function uniqueBy(items, key, limit = 10) {
    const seen = new Set();
    return items.filter(item => {
        const value = key(item).toLowerCase();
        if (!value || seen.has(value)) return false;
        seen.add(value);
        return true;
    }).slice(0, limit);
}

function getMainContent() {
    return (
        document.querySelector("main") ||
        document.querySelector("article") ||
        document.querySelector('[role="main"]') ||
        document.body
    );
}

function extractHeadings(container) {
    const headings = [];

    container.querySelectorAll("h1, h2, h3, h4").forEach(element => {
        const text = cleanText(element.innerText);

        if (text) {
            headings.push({
                level: element.tagName.toLowerCase(),
                text: text
            });
        }
    });

    // The page title and first sections provide enough context for a summary.
    return headings.slice(0, 8);
}
function extractText(container) {
    const text = [];

    container.querySelectorAll("p, li").forEach(element => {
        const value = cleanText(element.innerText);

        if (value && value.length > 20) {
            // Keep a representative excerpt; full articles are not needed for a page summary.
            text.push(truncateText(value, 500));
        }
    });

    return uniqueBy(text, value => value, 10);
}
function extractLinks(container) {
    const links = [];

    container.querySelectorAll("a").forEach(element => {

        const text = cleanText(element.innerText);
        const url = element.href;
        const rawHref = element.getAttribute("href") || "";

        if (!text || !url) {
            return;
        }

        // Ignore non-navigation and fragment-only links.
        if (rawHref.startsWith("javascript:") || rawHref.startsWith("#")) {
            return;
        }

        links.push({
            text: text,
            url: url
        });
    });

    return uniqueBy(links, link => link.url, 8);
}
function extractButtons(container) {
    const buttons = [];

    container.querySelectorAll(
        "button, input[type='button'], input[type='submit']"
    ).forEach(element => {

        const text = cleanText(
            element.innerText ||
            element.value ||
            element.getAttribute("aria-label") ||
            ""
        );

        if (text) {
            buttons.push(text);
        }
    });

    return uniqueBy(buttons, value => value, 8);
}
function extractForms(container) {

    const forms = [];

    container.querySelectorAll("form").forEach(form => {

        const fields = [];

        form.querySelectorAll("input, select, textarea").forEach(element => {

            let label = "";

            // Try to find label using "for"
            if (element.id) {
                const labelElement = form.querySelector(
                    `label[for="${element.id}"]`
                );

                if (labelElement) {
                    label = cleanText(labelElement.innerText);
                }
            }

            // Try parent label
            if (!label && element.closest("label")) {
                label = cleanText(
                    element.closest("label").innerText
                );
            }

            // Try placeholder
            if (!label) {
                label = element.getAttribute("placeholder") || "";
            }

            fields.push({
                name: element.name || "",
                id: element.id || "",
                type: element.type || element.tagName.toLowerCase(),
                label: label,
                required: element.required || false
            });
        });

        forms.push({
            action: form.action || "",
            method: form.method || "get",
            fields: fields
        });
    });

    return forms.filter(form => form.fields.length > 0).slice(0, 3);
}

function extractTables(container) {

    const tables = [];

    container.querySelectorAll("table").forEach(table => {

        const rows = [];

        table.querySelectorAll("tr").forEach(row => {

            const cells = [];

            row.querySelectorAll("th, td").forEach(cell => {
                cells.push(truncateText(cleanText(cell.innerText), 160));
            });

            if (cells.length > 0) {
                rows.push(cells);
            }
        });

        if (rows.length > 0) {
            // Tables become expensive quickly; preserve only a useful preview.
            tables.push(rows.slice(0, 8).map(cells => cells.slice(0, 6)));
        }
    });

    return tables.slice(0, 2);
}

function extractPageData() {

    const mainContent = getMainContent();

    const pageData = {

        page: {
            title: document.title,
            url: window.location.href
        },

        content: {
            headings: extractHeadings(mainContent),
            text: extractText(mainContent)
        },

        links: extractLinks(mainContent),

        buttons: extractButtons(mainContent),

        forms: extractForms(mainContent),

        tables: extractTables(mainContent)
    };

    return pageData;
}

const pageData = extractPageData();

console.log("Extracted page data:");
console.log(pageData);

async function sendToBackend(pageData) {
    try {
        const response = await fetch("http://127.0.0.1:8000/process-page", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pageData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || `HTTP error: ${response.status}`);
        }

        // `ai_ready_data` is the compact format given to the AI model.
        const aiResponse = JSON.parse(result.ai_response);
        console.log("AI-ready website data:", result.ai_ready_data);
        console.log("Website summary:", aiResponse);

        return { ...result, ai_response: aiResponse };

    } catch (error) {
        console.error("Failed to send data to FastAPI:", error);
    }
}

sendToBackend(pageData);

