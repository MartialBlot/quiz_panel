import React from 'react'
import {Button, Card, CardBody, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";

export const Quiz = ({players, scores, setScores, goToHomePage, setPlayers}) => {
    const {isOpen: isOpenReset, onOpen: onOpenReset, onOpenChange: onOpenChangeReset} = useDisclosure();
    const {isOpen: isOpenDisqualified, onOpen: onOpenDisqualified, onOpenChange: onOpenChangeDisqualified} = useDisclosure();
    const {isOpen: isOpenRanking, onOpen: onOpenRanking, onOpenChange: onOpenChangeRanking} = useDisclosure();
    const [preDisqualifiedPlayer, setPreDisqualifiedPlayer] = React.useState(null)

    const ranking = React.useMemo(() => {
        return [...Object.entries(scores)]
            .filter(s => typeof s[1] === 'number')
            .sort((a, b) => b[1] - a[1]) || []
    }, [scores])

    React.useEffect(() => {
        localStorage.setItem("save", JSON.stringify({players, scores}))
    }, [scores])

    const handleSumScore = (player) => setScores(e => {
        const tempObj = {...e}
        tempObj[player] = (tempObj[player] || 0) + 1;
        return tempObj
    })

    const handleSubScore = (player) => setScores(e => {
        const tempObj = {...e}
        tempObj[player] = tempObj[player] - 1;
        return tempObj
    })

    const handleReset = () => {
        localStorage.removeItem("save")
        setScores({})
        setPlayers([])
        goToHomePage()
    }

    const handleLockPlayer = (player) => {
        setScores(e => {
            const tempObj = {...e}
            tempObj[player] = "disqualifié(e)"
            return tempObj
        })
        setPreDisqualifiedPlayer(null)
    }

    return <div className="flex flex-wrap gap-10 justify-center items-center p-10 max-h-full overflow-y-auto">
        {
            players.map((player, index) => {
                return <Card key={index + 'playerQuiz'} className="relative overflow-visible w-[200px] h-[200px]">
                    <CardBody className="flex flex-col justify-around items-center">
                        <p>{player}</p>
                        <Button color="success" variant="shadow" onClick={() => handleSumScore(player)}
                                isDisabled={scores?.[player] === "disqualifié(e)"}>
                            +
                        </Button>
                        <Button color="danger" variant="shadow" onClick={() => handleSubScore(player)}
                                isDisabled={!scores?.[player] || scores?.[player] === "disqualifié(e)"}>
                            -
                        </Button>
                        <div>{scores?.[player] || 0}</div>
                        {
                            scores?.[player] !== "disqualifié(e)" &&
                            <div className="absolute top-0 right-0 text-3xl cursor-pointer"
                                 onClick={() => {
                                     onOpenDisqualified()
                                     setPreDisqualifiedPlayer(player)
                                 }}>💥
                            </div>
                        }
                    </CardBody>
                </Card>
            })
        }
        <Button color="danger" variant="shadow" onClick={onOpenReset} className="absolute bottom-5 right-5">
            RESET
        </Button>
        <Button color="success" variant="shadow" onClick={onOpenRanking} className="absolute bottom-5 left-5 text-white">
            CLASSEMENT
        </Button>
        <Modal isOpen={isOpenReset} onOpenChange={onOpenChangeReset}>
            <ModalContent>
                {(onClose) => (
                    <div className="flex flex-col items-center">
                        <ModalHeader className="flex flex-col gap-1">Supprimer ce quiz en cours ?</ModalHeader>
                        <ModalFooter>
                            <Button color="light" variant="light" onPress={onClose}>
                                Annuler
                            </Button>
                            <Button color="danger" onPress={handleReset}>
                                Supprimer et retourner à l'accueil
                            </Button>
                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
        <Modal isOpen={isOpenDisqualified} onOpenChange={onOpenChangeDisqualified}>
            <ModalContent>
                {(onClose) => (
                    <div className="flex flex-col items-center">
                        <ModalHeader className="flex flex-col gap-1">Disqualifier {preDisqualifiedPlayer} ?</ModalHeader>
                        <ModalFooter>
                            <Button color="light" variant="light" onPress={() => {
                                onClose()
                                setPreDisqualifiedPlayer(null)
                            }}>
                                Annuler
                            </Button>
                            <Button color="danger" onPress={() => {
                                handleLockPlayer(preDisqualifiedPlayer)
                                onClose()
                            }}>
                                Go OUT
                            </Button>
                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
        <Modal isOpen={isOpenRanking} onOpenChange={onOpenChangeRanking}>
            <ModalContent>
                {(onClose) => (
                    <div className="flex flex-col items-center">
                        <ModalHeader className="flex flex-col gap-1">Classement</ModalHeader>
                        {
                            ranking?.map((player, index) => {
                                return <div key={index + 'ranking'} className="flex gap-10 justify-between w-full px-10">
                                    <div className="text-justify">{player[0]}</div>
                                    <div className="text-justify">{player[1]}</div>
                                </div>
                            })
                        }
                        <ModalFooter>
                            <Button variant="flat" color="warning"  onPress={onClose}>
                                Fermer
                            </Button>
                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
    </div>
}