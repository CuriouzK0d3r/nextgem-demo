import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Dialog,
    Input,
    Typography
} from "@material-tailwind/react"; import * as cheerio from 'cheerio';

const SearchCardZenodo: React.FC<any> = ({ document, index, setShowModal, setPaperAbstract, setDataFiles }) => {
    return (
        <div style={{ borderColor: "#6359E1" }} className='rounded-lg'>
            <Card placeholder={""} className="w-full mb-4 p-6 hover:bg-[#eeeeee85] object-cover bg-[#eee] object-center shadow-xl shadow-blue-gray-900/50">
                <div className='flex'>
                    <div className="float-left w-5/6">
                        <h3 className="ml-3 text-left mb-3 text-lg">{document.title}</h3>
                        <div className="flex items-center mt-1">
                            <div className=" text-blue-500 ml-3">
                                {document.creators?.map((creator: any, i: number) => {
                                    if (i < 5) return (<span className='p-0' key={i + " span " + index}>{creator.name}, </span>);
                                    else if (i == 5) return (<span className='p-0' key={i + " span " + index}>{creator.name} et al. </span>);
                                })}, {document.publication_date}
                            </div>
                        </div>
                        <div className="flex items-center mt-4 mb-4">
                            <div className="ml-3 text-gray-700 dark:text-gray-400 text-left">{(cheerio.load(document.description, { xmlMode: true }) as any)?.text()}

                            </div>
                        </div>
                        <div className="flex items-center mt-1">
                            <a className="underline" href={document.DOI}>{document.DOI.replace("https://doi.org/", "")}</a>
                        </div>
                    </div>
                    <div className="float-right w-1/6 ">
                        <div className="align-right">
                            <a href="https://zenodo.org/" target="_blank"><div className="object-cover object-center shadow-lg shadow-blue-gray-900/50 w-[8rem] text-sm mr-4 text-center  mb-4 mx-auto bg-blue-500 float-right p-3 rounded-lg text-gray-100 invisible lg:visible">📖 Zenodo</div></a>
                            <a className="cursor-pointer" onClick={() => { setShowModal(true); setPaperAbstract(''); setDataFiles(document.files); }}><div className="object-cover object-center shadow-lg shadow-blue-gray-900/50 w-[8rem] text-center mx-auto text-sm mr-4 bg-blue-500 float-right p-3 rounded-lg text-gray-100 invisible lg:visible">📁 Files</div></a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SearchCardZenodo;