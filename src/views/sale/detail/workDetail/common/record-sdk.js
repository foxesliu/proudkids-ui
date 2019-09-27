import Recorder from "./Recorder";
export default class Record {
    startRecord(param) {
        let self = this;
        try {
            Recorder.get(rec => {
                self.recorder = rec;
                self.recorder.start();
                param.success("record successfully!");
            });
        } catch (e) {
            param.error("record failed!" + e);
        }
    }

    stopRecord(param) {
        let self = this;
        try {
            let blobData = self.recorder.getBlob();
            param.success(blobData);
        } catch (e) {
            param.error("record stop failed!" + e);
        }
    }

    play(audio) {
        let self = this;
        try {
            self.recorder.play(audio);
        } catch (e) {
        }
    }
}
