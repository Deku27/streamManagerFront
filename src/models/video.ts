export class Video {

  idvideo: number;
  filename: string;
  description: string;
  color: boolean;
  resolution: string;
  ocs: boolean ;
  csa5: boolean;
  format: string;
  status: string;
  enabled: boolean;
  audio: string;
  subtitle: string;
  pmt: string;

  constructor(filename: string , description: string , color: boolean, resolution: string, ocs: boolean, csa5: boolean, format: string,
    enabled: boolean) {
      this.filename = filename;
      this.description = description;
      this.color = color;
      this.resolution = resolution;
      this.ocs = ocs;
      this.csa5 = csa5;
      this.format = format;
      this.enabled = enabled;
    }
}
