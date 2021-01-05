export class AppUrlsService {
  //Cloud Domain
  public DOMAIN: string = "http://localhost:55959/";
  //Onstak Domain
  //  public DOMAIN: string = `http://192.198.218.58`;
  public IDENTITY_LINK: string = `${this.DOMAIN}/services/identity`;
  public CORE_LINK: string = `${this.DOMAIN}/services/core`;
  public CORE_LINK_cdn: string = `${this.DOMAIN}/services/`;
  public SOCKET_LINK: string = `${this.DOMAIN}`;
  public MQTT_LINK: string = `http://event-hub.dev.onstak.io:8080`;
}
