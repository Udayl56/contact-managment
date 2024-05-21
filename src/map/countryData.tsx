
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCovidCountryData = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
    return data;
};

export const useCovidCountryData = () => {
    return useQuery('covidCountryData', fetchCovidCountryData);
};
