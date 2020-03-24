import Entity from '@mediamonks/temple/Entity';
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";

import Animation from './Animation';

export default class Banner extends Entity {

  constructor(config) {
    super();

    // add required components here
    if (config) {
      this.addComponent(new ConfigComponent(config));
      this.config = config;
    }
  }

  async init() {
    await super.init();

  }

  exit = () => {
    window.open(window.clickTag, '_blank');
    this.handleExit();
  };

  handleExit = () => {

  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.exit();
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {

  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {

  };

  async start(){
    await this.init();
  }
}

