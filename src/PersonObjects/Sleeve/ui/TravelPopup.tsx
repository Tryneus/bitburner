import React from "react";
import { Sleeve } from "../Sleeve";
import { IPlayer } from "../../IPlayer";
import { CONSTANTS } from "../../../Constants";
import { removePopup } from "../../../ui/React/createPopup";
import { Money } from "../../../ui/React/Money";
import { WorldMap } from "../../../ui/React/WorldMap";
import { CityName } from "../../../Locations/data/CityNames";
import { dialogBoxCreate } from "../../../../utils/DialogBox";

interface IProps {
  popupId: string;
  sleeve: Sleeve;
  player: IPlayer;
  rerender: () => void;
}

export function TravelPopup(props: IProps): React.ReactElement {
  function travel(city: string): void {
    if (!props.player.canAfford(CONSTANTS.TravelCost)) {
      dialogBoxCreate("You cannot afford to have this sleeve travel to another city");
    }
    props.sleeve.city = city as CityName;
    props.player.loseMoney(CONSTANTS.TravelCost);
    props.sleeve.resetTaskStatus();
    removePopup(props.popupId);
    props.rerender();
  }

  return (
    <>
      <p>
        Have this sleeve travel to a different city. This affects the gyms and universities at which this sleeve can
        study. Traveling to a different city costs <Money money={CONSTANTS.TravelCost} player={props.player} />. It will
        also set your current sleeve task to idle.
      </p>
      <WorldMap currentCity={props.sleeve.city} onTravel={(city: CityName) => travel(city)} />
    </>
  );
}
