angular
    .module('ApproverApp')
    .factory('FileFactory', FileFactory);

FileFactory.$inject = ['$http', 'ServerUrl'];

function FileFactory($http, ServerUrl) {
    return {
        getLink: getLink
    };

    function getLink(fileId) {
        return ServerUrl + 'files/download/' + fileId + '/';
    };
}
