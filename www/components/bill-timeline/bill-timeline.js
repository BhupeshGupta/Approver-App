'use strict';
angular.module('ApproverApp')
    .component('billTimeline', {
        restrict: 'E',
        bindings: {
            auditTrail: '=',
            doctype: '='
        },
        templateUrl: '/components/bill-timeline/bill-timeline.html',
        //template: 'Yay',
        controller: billTimeline,
        controllerAs: 'btc'
    });

var jsondiffpatchTimeline = jsondiffpatch.create({
    //    objectHash: function (obj) {
    //        return obj.id || obj._id;
    //    },
    //    arrays: {
    //        detectMove: false,
    //        includeValueOnMove: false
    //    },
    //    textDiff: {
    //        minLength: 2
    //    },
    propertyFilter: function (name, context) {
        return ['createdAt', 'id', 'transactionId', 'updatedAt', 'uploadedon', 'verifiedon'].indexOf(name) == -1;
    },
    //    cloneDiffValues: true
    /* default false. if true, values in the obtained delta will be cloned,
         to ensure delta keeps no references to left or right objects. this becomes useful
         if you're diffing and patching the same objects multiple times without serializing deltas.
         instead of true, a function can be specified here to provide a custom clone(value)
         */
});

function billTimeline($scope) {

    var vm = this;
    $scope.events = [];

    vm.computeEvents = computeEvents;

    computeEvents(vm.auditTrail);

    var base_event = {
        badgeClass: 'info',
        badgeIconClass: 'glyphicon-check',
        //title: 'First heading ',
        //when: '11 hours ago via Twitter',
        //content: 'Some awesome content.'
    };

    function computeEvents(auditTrail) {
        var i = auditTrail.length;

        while (i-- > 1) {
            var value = auditTrail[i];
            var new_value = auditTrail[i - 1];

            if (value.account)
                value.account = value.account.id;

            if (new_value.account)
                new_value.account = new_value.account.id;

            var event_old = value;
            var event_new = JSON.parse(JSON.stringify(new_value), jsondiffpatch.dateReviver);

            var delta = jsondiffpatchTimeline.diff(event_old, event_new);

            if (!delta && auditTrail.length) {
                delta = jsondiffpatchTimeline.diff({}, event_new);
            }

            if (delta) {
                event_new.delta = delta;
                event_new.text = '';
                computeTimelineText(event_new);
                console.log(event_new);

                event_new.createdAtAgo = moment(event_new.createdAt).fromNow();

                $scope.events.push(event_new);
            }

        }

    }




    function computeTimelineText(event) {
        angular.forEach(event.delta, function (value, key) {
            var changeText = '';
            if (key == 'status') {
                var action = 'N/A';
                if (value[1] == 1) {
                    action = 'Approved';
                    event.badgeClass = 'info';
                } else if (value[1] == 2) {
                    action = 'Rejected';
                    event.badgeClass = 'warning';
                }
                changeText = 'Is ' + action + ' by ' + event.verifiedby;

            } else if (key == 'account') {
                if (!event.badgeClass)
                    event.badgeClass = 'default';

                changeText = 'Is handedover from ' + (value[0] || 'N/A') + ' to ' + (value[1] || 'N/A');
            }
            if (changeText)
                event.text += changeText + '. \n';
        });

    }



    //    $scope.events = [{
    //        badgeClass: 'info',
    //        badgeIconClass: 'glyphicon-check',
    //        title: 'First heading',
    //        when: '11 hours ago via Twitter',
    //        content: 'Some awesome content.'
    //    }, {
    //        badgeClass: 'warning',
    //        badgeIconClass: 'glyphicon-credit-card',
    //        title: 'Second heading',
    //        when: '12 hours ago via Twitter',
    //        content: 'More awesome content.'
    //    }, {
    //        badgeClass: 'default',
    //        badgeIconClass: 'glyphicon-credit-card',
    //        title: 'Third heading',
    //        titleContentHtml: '<img class="img-responsive" src="http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg">',
    //        contentHtml: lorem,
    //        footerContentHtml: '<a href="">Continue Reading</a>'
    //    }];


    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementIn = function ($el) {
        $el.removeClass('timeline-hidden');
        $el.addClass('bounce-in');
    };

    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementOut = function ($el) {
        $el.addClass('timeline-hidden');
        $el.removeClass('bounce-in');
    };


    $scope.rightAlign = function () {
        $scope.side = 'right';
    }



}
