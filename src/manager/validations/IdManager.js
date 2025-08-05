class IdManager {
    generate(items) {
        const ids = items.map(item => item.id);
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }
}

export const idManager = new IdManager();
