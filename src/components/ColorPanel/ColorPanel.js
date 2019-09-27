import React from "react";
import { List, ListItem, Drawer, ListItemIcon } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

const ColorPanel = props => {
  return (
    <Drawer open variant="persistent">
      <List>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ColorPanel;
