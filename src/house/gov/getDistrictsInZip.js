
import request from 'request-promise-native';


export const INVALID_ZIP = zip =>
    `Invalid zip code: "${zip}".`;

export const NO_RESULTS_ZIP = zip =>
    `No results for zip code: "${zip}".`;

export const INVALID_DISTRICT_CODE_STRING = val =>
    `District code substring: "${val}" is an invalid format.`;

export const endpoint = zip =>
    `http://ziplook.house.gov/htbin/findrep?ZIP=${zip}`;

export function parseDistrictCode(val) {

    if (!val) {
        // eslint-disable-next-line babel/new-cap
        throw new Error(INVALID_DISTRICT_CODE_STRING(val));
    }

    const num = val.match(/\d+/g);
    const st = val.substring(1, 3);

    if (!num || !st ||
        st.length !== 2 ||
        num.length !== 1 ||
        isNaN(num[0]) ||
        num[0].length > 2
    ) {
        // eslint-disable-next-line babel/new-cap
        throw new Error(INVALID_DISTRICT_CODE_STRING(val));
    }

    return `${st}-${Number(num)}`;
}

export function scrapePage(html, zip) {

    const expected404Msg = `The ZIP code ${zip}  was not found.`;

    if (html.indexOf(expected404Msg) > -1) {
        return [];
    }

    if (html.indexOf('invalid Zip Code') > -1) {
        // eslint-disable-next-line babel/new-cap
        throw new Error(INVALID_ZIP(zip));
    }

    const startStr = 'districts=[';
    const start = html.indexOf(startStr) + startStr.length;
    const end = html.indexOf('];', start);
    const data = html.substring(start, end).split(',');
    return data
        .map(parseDistrictCode);
}

/**
 * Retrieves an array of Congressional districts based on zip
 * by scraping house.gov's district finder.
 * @see http://ziplook.house.gov/htbin/findrep
 * @param {string} zip -    A 5 digit zip code.
 *                          Prefix 4 digit zip codes w/ "0".
 * @returns {Promise}
 *      Rejects with a 404 if no district codes are found.
 *      Resolves with an array of hyphen delimited district codes.
 *      ex: ['AL-1','AL-2']
 */
export default function getDistrictsInZip(zip) {
    return request
        .get({ uri: endpoint(zip) })
        .then(html => scrapePage(html, zip))
        .then((result) => {
            if (result.length) {
                return result;
            }
            return Promise.reject({
                statusCode: 404,
                // eslint-disable-next-line babel/new-cap
                message: NO_RESULTS_ZIP(zip)
            });
        });
}
