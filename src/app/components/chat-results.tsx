import { Pagination } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaUserLarge } from "react-icons/fa6";
import { TbRobot } from "react-icons/tb";
import EntryModal from './helpers/EntryModal';

const DUMMY_URL = "http://139.91.58.19:11434/api/generate";

const ChatResults: React.FC<any> = ({ submittedQuery, finished, setFinished, setChatMessage }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [paperAbstract, setPaperAbstract] = React.useState('');
    const [dataFiles, setDataFiles] = React.useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filteredResults, setFilteredResults] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [reader, setReader] = useState<ReadableStreamDefaultReader<string>>();
    const finishedRef = useRef<boolean>();
    const readerRef = useRef<any>();


    finishedRef.current = finished;
    readerRef.current = reader;

    let cMess = "";
    let messagesList: string[] = [];
    let finito = false;

    async function chat() {
        if (submittedQuery.length === 0) return;
        setIsLoading(true);
        setMessages([...messages, submittedQuery]);
        messagesList = [...messages, submittedQuery];
        setChatMessage('');

        setFinished(false);
        console.log(finished)
        console.log('yolo')

        await fetch(DUMMY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "model": "llama2:13b", "prompt": submittedQuery, "stream": true }),
        })
            .then(response => {
                if (response.ok && response.body) {
                    const reader_tmp = response.body.pipeThrough(new TextDecoderStream()).getReader();
                    setReader(reader_tmp);

                    const readStream = (): any =>
                        reader_tmp.read().then(({
                            value,
                            done
                        }) => {
                            if (!finishedRef.current) {
                                if (done) {
                                    messagesList = [...messagesList, cMess];
                                    console.log(messages)
                                    setMessages(messagesList);
                                    console.log(currentMessage)
                                    setCurrentMessage("");
                                    cMess = "";
                                    setIsLoading(false);
                                    readerRef.current?.cancel();
                                    setFinished(true);
                                    return Promise.resolve();
                                } else {
                                    const data = /{.*}/.exec(value);
                                    if (!data || !data[0]) {
                                        return readStream();
                                    }

                                    const res = JSON.parse(data[0]);
                                    cMess += res.response;
                                    setCurrentMessage(cMess);
                                }
                            } else {
                                readerRef.current?.cancel();
                            }

                            return readStream();
                        });
                    return readStream();
                } else {
                    setFinished(true);
                    return Promise.reject(response);
                }
            });
    };

    useEffect(() => {
        chat();
    }, [submittedQuery]);

    useEffect(() => {
        const close = (e: any) => {
            if (e.keyCode === 27) {
                readerRef.current?.cancel();
                setFinished(true);
                console.log(finishedRef.current)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, []);

    return (
        <div className='h-full w-4/5 mx-auto'>
            {submittedQuery.length ?
                (<div className="mt-6 h-full">
                    <div className='mx-auto'>
                    </div>
                    <div className="">
                        <div className="flex flex-col">
                            <div className="-my-2 flex-1 sm:-mx-6 lg:-mx-8 rounded-xl">
                                <div className=" align-middle rounded inline-block w-full ">
                                    <div className={"rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50 " + (submittedQuery.length ? "border-t border-l border-r dark:border-gray-700 border-gray-200" : "")}>
                                        <div>
                                            <div className="flex-1 justify-between flex flex-col h-[55rem]">
                                                <div id="messages" className="flex flex-col space-y-4 p-3 h-full overflow-y-auto  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-medium">
                                                    {
                                                        messages.map((message: string, index: number) => (
                                                            index % 2 === 1 ?
                                                                <div key={index}>
                                                                    <div className="flex items-end">
                                                                        <div className="flex flex-col space-y-2 text-md leading-tight max-w-xl mx-2">
                                                                            <div>
                                                                                <span className="px-4 py-3 rounded-xl inline-block text-white" style={{ backgroundColor: '#6359E1' }} >{message}</span>
                                                                            </div>
                                                                        </div>
                                                                        <TbRobot className="w-6 h-6" />
                                                                    </div>
                                                                </div> :
                                                                <div key={index}>
                                                                    <div className="flex items-end float-right">
                                                                        <div className="flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2">

                                                                            <div>
                                                                                <FaUserLarge className="float-left mr-2 mt-6 h-4 w-4" />
                                                                                <span className="px-4 py-3 rounded-xl inline-block bg-blue-500 text-white" >{message}</span>
                                                                            </div>
                                                                        </div>
                                                                        {}
                                                                    </div>
                                                                </div>
                                                        ))
                                                    }

                                                    <div>
                                                        <div className="flex items-end">
                                                            <div className="flex flex-col space-y-2 text-md leading-tight max-w-xl mx-2">
                                                                <div>
                                                                    {
                                                                        currentMessage?.length ?
                                                                            <span style={{ backgroundColor: '#6359E1' }} className="px-4 py-3 rounded-xl inline-block text-white" >{currentMessage}</span> : (isLoading && (<div><img style={{ backgroundColor: 'white' }} src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." className="w-16 ml-6" /></div>))
                                                                    }
                                                                </div>
                                                            </div>
                                                            {
                                                                currentMessage?.length || isLoading ?
                                                                    <TbRobot className="w-6 h-6" />
                                                                    : <></>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : <></>}
        </div>
    );
};

export default ChatResults;