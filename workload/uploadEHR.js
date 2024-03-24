'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const fs = require('fs');
class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.pk = fs.readFileSync('../pk.txt','utf8') 
        this.mspRedactJSON = '{"P":null,"Mat":[[0,0,-1,0],[0,-1,1,0],[0,0,0,-1],[0,-1,0,1],[1,1,0,0]],"RowToAttrib":["0","1","2","3","5"]}'
        this.cid = "QmYpLtwy3gHbg9Jh8ae5g11aQeh7P69KEWttdS7p3NB12j"
        this.cipherJSON = fs.readFileSync('../cipherJSON.txt','utf8')
    }

    async submitTransaction() {
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'UploadEHR',
            invokerIdentity: 'User1',
            contractArguments: ["true",this.pk,this.mspRedactJSON,this.cid,this.cipherJSON],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(myArgs);
    }

    async cleanupWorkloadModule() {
        
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;