import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    Input,
    ModalFooter,
    Button,
    useDisclosure,
    Card,
    CardBody
} from "@nextui-org/react";
import {toast} from "react-hot-toast";

export const Home = ({players, setPlayers, goQuizPage}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [input, setInput] = React.useState("")

    const handleAddPlayer = (player) => {
        if (players.includes(player?.trim()) || !player?.trim()?.length) {
            return toast.error("Erreur ou Joueur(euuuse) déjà ajouté(e)")
        }
        if (player.trim().length >= 12) return toast.error("Nom trop lonnnnnnng ...");
        setPlayers(e => [...e, player?.trim()])
        setInput("")
        return toast.success("Joueur(euuuse) ajouté(e) avec succès")
    }

    const handleChangeInput = (event) => setInput(event.target.value);

    const deletePlayer = (player) => {
        setPlayers(e => {
            const newPLayersArray = [...e].filter(p => p !== player)
            return [...newPLayersArray]
        })
    }

    return <div className="flex flex-col text-center h-full">
        <div className="text-7xl mt-20">Quiz Panel</div>
        <div className="size-full flex items-center justify-center gap-20">
            <Button radius="full" className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg"
                    onPress={onOpen}>
                Ajouter des participants
            </Button>
            <Button color="success"
                    onClick={() => {
                        if (players?.length < 2) return toast.error("Pas assez de joueurs(euuuses) Billy ...")
                        goQuizPage(players)
                        toast.success("Le quiz commence Billy ...")
                    }}
                    className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg" isDisabled={players?.length < 2}>
                Démarrer
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <div className="flex flex-col items-center">
                            <ModalHeader className="flex flex-col gap-1">Ajouter un(e) participant(e)</ModalHeader>
                            <Input
                                type="email"
                                color="primary"
                                label="Nom"
                                placeholder="Tape ici ..."
                                onChange={handleChangeInput}
                                className="max-w-[220px]"
                                value={input}
                            />
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fermer
                                </Button>
                                <Button color="primary" onPress={() => handleAddPlayer(input)}>
                                    Ajouter
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
            <div className="flex flex-wrap gap-5 absolute bottom-5 max-w-[100%] justify-center">
                {
                    players.map((p, index) => {
                        return <Card key={index + 'playersHome'} className="relative overflow-visible">
                            <div
                                className="absolute top-[-12px] right-[-2px] bg-danger rounded w-5 h-5 flex justify-center items-center cursor-pointer"
                                onClick={() => deletePlayer(p)}>x
                            </div>
                            <CardBody>
                                <p>{p}</p>
                            </CardBody>
                        </Card>
                    })
                }
            </div>

        </div>
    </div>
}