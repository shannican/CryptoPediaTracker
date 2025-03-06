import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./style.css";
import { useEffect, useState } from 'react';
import get100Coins from '../../../functions/get100Coins';

const SelectCoin = ({ firstCoinId, secondCoinId, handleCryptoChange }) => {
    const [allCoins, setAllCoins] = useState([]);

    const style = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--yellow)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "var(--white)",
                transition: "all 0.3s"
            },
        },
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const myData = await get100Coins();
        if (myData) {
            setAllCoins(myData);
        }
    }

    return (
        <div className="select-coin-div">
            <p>Crypto 1 :</p>
            <div className="select-btn">
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel style={{ color: "var(--white)" }} id="crypto1-label">Crypto1</InputLabel>
                    <Select
                        sx={style}
                        labelId="crypto1-label"
                        id="crypto1"
                        value={firstCoinId}
                        label="Crypto1"
                        onChange={(e) => handleCryptoChange(e, false)}
                    >
                        {
                            allCoins.filter((item) => item.id !== secondCoinId).map((coin, i) => (
                                <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>

            <p>Crypto 2 :</p>
            <div className="select-btn">
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel style={{ color: "var(--white)" }} id="crypto2-label">Crypto2</InputLabel>
                    <Select
                        sx={style}
                        labelId="crypto2-label"
                        id="crypto2"
                        value={secondCoinId}
                        label="Crypto2"
                        onChange={(e) => handleCryptoChange(e, true)}
                    >
                        {
                            allCoins.filter((item) => item.id !== firstCoinId).map((coin, i) => (
                                <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

SelectCoin.propTypes = {
    firstCoinId: PropTypes.string.isRequired,
    secondCoinId: PropTypes.string.isRequired,
    handleCryptoChange: PropTypes.func.isRequired
};

export default SelectCoin;
