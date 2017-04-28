export default {
    exchangeElement(newIdx, oldIdx, from, to) {
        if (!to) to = from
        var exchanged = from.splice(oldIdx, 1)[0]
        to.splice(newIdx, 0, exchanged)
        return {
            from: from,
            to: to,
            exchanged: exchanged
        }
    }
}