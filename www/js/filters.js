angular
  .module('ApproverApp')
  .filter('reviewServerFile', reviewServerFileFilter);


reviewServerFileFilter.$inject = ['FileFactory'];

function reviewServerFileFilter(FileFactory) {
  return function(input) {
    return FileFactory.getLink(input);
  };
}
