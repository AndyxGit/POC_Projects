import { onChangeFilters } from './filtersUtils';

describe('onChangeFilters', () => {
  it('should update the selected filters array correctly when a social network is selected', () => {
    const e = [{ value: 'Facebook', label: 'Facebook' }];
    const socialNetworks = ['Facebook', 'Twitter', 'Instagram'];
    const selectedFilters = [{ label: 'Redes Sociales', value: [1, 2, 3] }];
    const setSelectedFilters = jest.fn();

    onChangeFilters(e, socialNetworks, selectedFilters, setSelectedFilters);

    expect(setSelectedFilters).toHaveBeenCalledWith([{ label: 'Facebook', value: 'Facebook' }]);
  });

  it('should remove null values from the selected filters array when multiple filters are selected', () => {
    const e = [{ value: null, label: 'Todos' }, { value: '123', label: 'Filter 1' }, { value: '456', label: 'Filter 2' }];
    const socialNetworks = ['Facebook', 'Twitter', 'Instagram'];
    const selectedFilters = [{ label: 'Redes Sociales', value: ['Twitter'] }];
    const setSelectedFilters = jest.fn();

    onChangeFilters(e, socialNetworks, selectedFilters, setSelectedFilters);

    expect(setSelectedFilters).toHaveBeenCalledWith([{ value: '123', label: 'Filter 1' }, { value: '456', label: 'Filter 2' }]);
  });

  it('should remove all non-null values from the selected filters array when "Todos" is selected', () => {
    const e = [{ value: null, label: 'Todos' }];
    const socialNetworks = ['Facebook', 'Twitter', 'Instagram'];
    const selectedFilters = [{ label: 'Redes Sociales', value: ['Twitter'] }, { value: '123', label: 'Filter 1' }, { value: '456', label: 'Filter 2' }];
    const setSelectedFilters = jest.fn();

    onChangeFilters(e, socialNetworks, selectedFilters, setSelectedFilters);

    expect(setSelectedFilters).toHaveBeenCalledWith([{ value: null, label: 'Todos' }]);
  });

  it('should update the selected filters array correctly when "Redes Sociales" is selected', () => {
    const e = [{ label: 'Redes Sociales', value: ['1, 2']}];
    const socialNetworks = [{ label: 'Twitter', value: 1 }, { label: 'Facebook', value: 2 }];
    const selectedFilters = [{ label: 'Redes Sociales', value: ['1, 2']}];
    const setSelectedFilters = jest.fn();

    onChangeFilters(e, socialNetworks, selectedFilters, setSelectedFilters);

    expect(setSelectedFilters).toHaveBeenCalledWith([{"label": "Redes Sociales", "value": ["1, 2"]}, {"label": "Redes Sociales", "value": ["1, 2"]}]);
  });

  it('should update the selected filters array correctly when no special cases apply', () => {
    const e = [{ value: '123', label: 'Filter 1' }];
    const socialNetworks = ['Facebook', 'Twitter', 'Instagram'];
    const selectedFilters = [{ label: 'Redes Sociales', value: ['Twitter'] }];
    const setSelectedFilters = jest.fn();

    onChangeFilters(e, socialNetworks, selectedFilters, setSelectedFilters);

    expect(setSelectedFilters).toHaveBeenCalledWith([{ value: '123', label: 'Filter 1' }]);
  });
});
