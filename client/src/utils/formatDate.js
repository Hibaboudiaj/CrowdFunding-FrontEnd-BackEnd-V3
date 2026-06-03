function formatDate(isoString) {
    const date = new Date(isoString);

    const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const timeStr = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return `${dateStr} · ${timeStr}`;
}

export { formatDate };
