import React from "react";
import { countries } from '../../../constant';

export const CountrySelect: React.FC = () => {
    return (
        <td>
            <select>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
        </td>
    );
};