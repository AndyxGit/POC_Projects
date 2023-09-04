export const onChangeFilters = (e, socialNetworks, selectedFilters, setSelectedFilters) => {
    if (e.length === 0) {
        return setSelectedFilters([{ value: null, label: 'Todos' }]);
    }
    const selectedItem = e[e.length - 1];
    const isSocialNetwork = socialNetworks.filter((item) => item === selectedItem.value);
    if (isSocialNetwork.length) {
        const hasRedesSociales = selectedFilters.find(element => element.label === 'Redes Sociales');
        if (hasRedesSociales !== undefined) {
            const newArray = [];
            const arrayWithoutSocialNetworks = selectedFilters.filter((item) => item.label !== 'Redes Sociales');
            newArray.push(arrayWithoutSocialNetworks);
            newArray[0].push(selectedItem);
            return setSelectedFilters(newArray[0]);
        }
    }
    if (e.length > 1 && e[0].value === null) {
        const newArray = e.filter((filter) => filter.value !== null);
        return setSelectedFilters(newArray);
    }
    if (selectedItem.label === 'Todos') {
        const newArray = e.filter((filter) => filter.value === null)
        return setSelectedFilters(newArray);
    }
    if (selectedItem.label === 'Redes Sociales') {
        let newArray = selectedFilters;
        selectedItem.value.map((item) => {
            selectedFilters.map((filter) => {
                if (item.ratingGroupId === filter.value) { const datita = newArray.filter((algo) => algo.value !== filter.value); 
                    return newArray = datita;
                }
            });
        });
        newArray.push(selectedItem);
        return setSelectedFilters(newArray);
    }
    return setSelectedFilters(e);
}