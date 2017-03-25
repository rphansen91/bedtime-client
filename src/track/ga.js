import ReactGA from 'react-ga';

export const initGA = (history) => {
    ReactGA.initialize('UA-96168089-1');
    history.listen(location => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });
}

export const event = (c,a,l) => ReactGA.event({
    category: c || '',
    action: a || '',
    label: l || ''
});