"use client";
import { Tab, Disclosure } from "@headlessui/react";
import { useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const example: number[][] = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

type Result = {
  name: string;
  data: number[];
  time: number;
  size: number;
}[];

export default function Page() {
  const [result, setResult] = useState<Result>([]);
  const inputData = useRef<HTMLTextAreaElement>(null);
  const shortType = useRef<HTMLSelectElement>(null);

  const setExampleData = () => {
    if (inputData.current) inputData.current.value = JSON.stringify(example);
  };

  const bubbleShort = (data: number[]) => {
    const type = shortType.current?.value;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - 1; j++) {
        if (type === "asc" && data[j] > data[j + 1]) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }

        if (type === "desc" && data[j] < data[j + 1]) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }

    return data;
  };

  const runShorting = () => {
    if (inputData.current) {
      try {
        const data = JSON.parse(inputData.current.value);
        data.forEach((item: number[]) => {
          const start = performance.now();
          const data = bubbleShort(item);
          const end = performance.now();
          const time = Math.round(end - start);
          const size = item.length;

          setResult((prev) => {
            return [
              ...prev,
              {
                name: `Run #${prev.length + 1}`,
                data: data,
                time: time,
                size: size,
              },
            ];
          });
        });
      } catch (error) {
        alert("Invalid data");
      }
    }
  };

  return (
    <div className="container mx-auto flex-grow">
      <div className="flex flex-col space-y-2 text-center py-8 lg:py-16">
        <h1 className="text-4xl font-bold">Bubble Short Algorithm Analysis</h1>
        <h3 className="text-2xl">With Implementation Using Javascript.</h3>
      </div>
      <div className="flex flex-col lg:flex-row mt-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="lg:w-2/5">
          <div className="bg-white shadow rounded-md flex flex-col p-4">
            <div className="flex flex-col space-y-4">
              <h5 className="text-center text-lg">Insert Data</h5>

              <div className="flex flex-col space-y-2">
                <label className="text-sm">Sort Type</label>
                <select
                  ref={shortType}
                  className="rounded-md px-4 py-2 bg-gray-50 border border-gray-200"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm">
                  Data (
                  <a
                    href="#"
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setExampleData();
                    }}
                  >
                    Use example data
                  </a>
                  )
                </label>
                <textarea
                  id="name"
                  ref={inputData}
                  className="rounded-md px-4 py-2 bg-gray-50 border border-gray-200 h-28 lg:h-48"
                  placeholder={
                    `JSON array data. Example : ` + JSON.stringify(example)
                  }
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white rounded-md px-16 py-2"
                  onClick={runShorting}
                >
                  Run
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/5">
          <Tab.Group>
            <Tab.List className="flex space-x-4">
              <Tab
                key="result"
                className={({ selected }) => {
                  return (
                    "flex-1 p-4 rounded-md text-lg " +
                    (selected ? "bg-white shadow" : "border-2")
                  );
                }}
              >
                Result
              </Tab>
              <Tab
                key="chart"
                className={({ selected }) => {
                  return (
                    "flex-1 p-4 rounded-md text-lg " +
                    (selected ? "bg-white shadow" : "border-2")
                  );
                }}
              >
                Chart
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              <Tab.Panel
                key="result"
                className="flex flex-col bg-white rounded-md shadow p-4 space-y-4"
              >
                <div className="flex justify-between">
                  <div className="inline-block align-middle text-lg">
                    Bubble Short Result
                  </div>
                  {result.length > 0 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white rounded-md px-4 py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setResult([]);
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex flex-col space-y-4">
                  {result.length === 0 && (
                    <div className="text-center text-gray-500 py-32">
                      No result yet
                    </div>
                  )}
                  {result.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col space-y-2">
                        <Disclosure>
                          <Disclosure.Button className="py-2 text-left px-4 shadow rounded-md bg-blue-100 hover:bg-blue-200 text-blue-500">
                            {item.name} -
                            <span className="bg-green-500 text-white rounded px-2 text-xs mx-1">
                              {item.size} data
                            </span>
                            <span className="bg-yellow-500 text-white rounded px-2 text-xs mx-1">
                              {item.time} ms
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="block text-gray-500 bg-gray-50 p-4 border rounded-md">
                            <p className="text-ellipsis overflow-hidden">
                              {JSON.stringify(item.data)}
                            </p>
                          </Disclosure.Panel>
                        </Disclosure>
                      </div>
                    );
                  })}
                </div>
              </Tab.Panel>
              <Tab.Panel
                key="chart"
                className="flex flex-col space-y-4 bg-white rounded-md shadow p-4"
              >
                <div className="flex justify-between">
                  <div className="inline-block align-middle text-lg">
                    Performance Chart
                  </div>
                  {result.length > 0 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white rounded-md px-4 py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setResult([]);
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart width={650} height={400} data={result}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
