import React, { useEffect, useState } from "react";
import "./converter.css";
import { Button, Card, Form, Input, Select } from "antd";
import axios from "axios";

const apiURL = "https://api.coingecko.com/api/v3/exchange_rates";

const Converter = () => {
  const defaultFirstSelectedValue = "Bitcoin";
  const defaultSecondSelectedValue = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelectedValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondSelectedValue);
  const [result, setResult] = useState("0");

  useEffect(() => {
    apiData();
  }, []);


  useEffect(() => {
    if (cryptoList.length === 0) return;
    const firstSelectRate = cryptoList.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const secondSelectRate = cryptoList.find((item) => {
      return item.value === secondSelect;
    }).rate;
    const resultValue = (inputValue * secondSelectRate) / firstSelectRate;
    setResult(resultValue.toFixed(2));
  }, [inputValue, firstSelect, secondSelect]);


  const apiData = () => {
    axios.get(apiURL).then((res) => {
      const coinData = res.data.rates;
      const tempArray = Object.entries(coinData).map((item) => {
        return {
          value: item[1].name,
          label: item[1].name,
          rate: item[1].value,
        };
      });
      setCryptoList(tempArray);
    });
  };

  return (
    <div className="container">
      <Card title={<h1>Crypto Converter</h1>}>
        <Form>
          <Form.Item>
            <Input type="number" onChange={(e) => setInputValue(e.target.value)} placeholder="Enter a Value" />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            defaultValue={defaultFirstSelectedValue}
            style={{ width: "220px" }}
            options={cryptoList}
            onChange={(value) => setFirstSelect(value)}
          />
          <Select
            defaultValue={defaultSecondSelectedValue}
            style={{ width: "220px" }}
            options={cryptoList}
            onChange={(value) => setSecondSelect(value)}
          />
        </div>
        <h3 >{inputValue}  {firstSelect} = {result} {secondSelect}</h3>
      </Card>
    </div>
  );
};

export default Converter;
