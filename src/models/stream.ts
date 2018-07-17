export class Stream {

  lcn: number ;
  usi: number ;
  name: string ;
  description: string ;
  videofile: string ;
  tsid: number ;
  sid: number ;
  onid: number ;
  enable: boolean ;
  address: string ;
  port: number ;
  videoid: number ;

  constructor(lcn: number, usi: number, name: string, description: string, videofile: string, enable: boolean, address: string
              , port: number, tsid: number, sid: number, onid: number, videoid: number) {
    this.lcn = lcn;
    this.usi = usi;
    this.name = name;
    this.description = description;
    this.videofile = videofile;
    this.tsid = tsid;
    this.sid = sid;
    this.onid = onid;
    this.enable = enable;
    this.address = address;
    this.port = port;
    this.videoid = videoid;

  }
}
