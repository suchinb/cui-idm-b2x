angular.module('app')
.config(['$translateProvider','$locationProvider','$stateProvider','$urlRouterProvider',
    '$injector','localStorageServiceProvider','$cuiIconProvider','$cuiI18nProvider',
function($translateProvider,$locationProvider,$stateProvider,$urlRouterProvider,
    $injector,localStorageServiceProvider,$cuiIconProvider,$cuiI18nProvider){

    localStorageServiceProvider.setPrefix('cui');

    var templateBase = 'assets/app/'; // base directory of your partials


    var returnCtrlAs = function(name, asPrefix) {
        // build controller as syntax easily. returnCtrlAs('test','new') returns 'testCtrl as newTest'
        // returnCtrlAs('test') returns 'testCtrl as test'
        return name + 'Ctrl as ' + ( asPrefix? asPrefix : '' ) + ( asPrefix? name[0].toUpperCase() + name.slice(1,name.length) : name );
    };

    $stateProvider
        // Base ----------------------------------------------------------
        .state('base',{
            url: '/',
            templateUrl: templateBase + 'base/base.html',
            controller: returnCtrlAs('base'),
        })
        // Welcome -------------------------------------------------------
        .state('welcome',{
            url: '/welcome',
            templateUrl: templateBase + 'welcome/welcome.html'
        })
        // Registration --------------------------------------------------
        .state('registration', {
            url: '/register',
            templateUrl: templateBase + 'registration/registration.html'
        })
        .state('registration.invited', {
            url: '/invitation?id&code',
            templateUrl: templateBase + 'registration/userInvited/users.register.html',
            controller: returnCtrlAs('usersRegister')
        })
        .state('registration.walkup', {
            url: '/walkup',
            templateUrl:templateBase + 'registration/userWalkup/users.walkup.html',
            controller: returnCtrlAs('usersWalkup')
            // menu:{
            //     desktop:false
            // }
        })
        .state('registration.tlo', {
            url: '/top-level-org',
            templateUrl: templateBase + 'registration/newTopLevelOrg/topLevelOrg.registration.html',
            controller: returnCtrlAs('tlo','new')
        })
        .state('registration.division', {
            url: '/new-division',
            templateUrl: templateBase + 'registration/newDivision/division.registration.html',
            controller: returnCtrlAs('division','new')
        })
        // User ----------------------------------------------------------
        .state('user', {
            url: '/user',
            templateUrl: templateBase + 'user/user.html'
        })
        .state('user.profile', {
            url: '/profile',
            templateUrl: templateBase + 'user/profile/user.profile.html',
            controller: returnCtrlAs('userProfile')
        })
        // Applications --------------------------------------------------
        .state('applications', {
            url: '/applications',
            templateUrl : templateBase + 'applications/applications.html'
        })
        .state('applications.myApplications', {
            url: '/',
            templateUrl: templateBase + 'applications/my-applications/my-applications.html',
            controller: returnCtrlAs('myApplications')
        })
        .state('applications.myApplicationDetails', {
            url: '/:packageId/:appId',
            templateUrl: templateBase + 'applications/my-applications/my-application-details.html',
            controller: returnCtrlAs('myApplicationDetails')
        })
        .state('applications.newRequest', {
            url: '/request',
            templateUrl: templateBase + 'applications/new-request&review/new-request.html',
            controller: returnCtrlAs('newAppRequest')
        })
        .state('applications.search', {
            url: '/search?name&category&page',
            templateUrl: templateBase + 'applications/search/search.html',
            controller: returnCtrlAs('applicationSearch')
        })
        .state('applications.reviewRequest', {
            url: '/review',
            templateUrl: templateBase + 'applications/new-request&review/review.html',
            controller: returnCtrlAs('applicationReview')
        })
        .state('applications.orgApplications', {
            url: '/organization?id',
            templateUrl: templateBase + 'applications/org-applications/org-applications.html',
            controller: returnCtrlAs('orgApplications')
        })
        // Organization --------------------------------------------------
        .state('organization', {
            url: '/organization',
            templateUrl: templateBase + 'organization/organization.html'
        })
        .state('organization.profile', {
            url: '/profile?id',
            templateUrl: templateBase + 'organization/profile/organization.profile.html',
            controller: returnCtrlAs('orgProfile')
        })
        .state('organization.directory', {
            url: '/directory?id',
            templateUrl: templateBase + 'organization/directory/organization.directory.html',
            controller: returnCtrlAs('orgDirectory')
        })
        .state('organization.hierarchy', {
            url: '/hierarchy?id',
            templateUrl: templateBase + 'organization/hierarchy/organization.hierarchy.html',
            controller: returnCtrlAs('orgHierarchy')
        })
        .state('organization.roles', {
            url: '/roles',
            templateUrl: templateBase + 'organization/roles/organization.roles.html',
            controller: returnCtrlAs('orgRoles')
        })
        .state('directory', {
            url: '/organization/directory',
            templateUrl: templateBase + 'organization/directory/directory.html'
        })
        .state('directory.userDetails', {
            url: '/user-details?id',
            templateUrl: templateBase + 'organization/directory/user-details/directory.userDetails.html',
            controller: returnCtrlAs('userDetails')
        })
        // Misc ----------------------------------------------------------
        .state('misc', {
            url: '/status',
            templateUrl: templateBase + 'misc/misc.html'
        })
        .state('misc.404', {
            url: '/404',
            templateUrl: templateBase + 'misc/misc.404.html'
        })
        .state('misc.notAuth', {
            url: '/notAuthorized',
            templateUrl: templateBase + 'misc/misc.notAuth.html'
        })
        .state('misc.pendingStatus', {
            url: '/pendingStatus',
            templateUrl: templateBase + 'misc/misc.pendingStatus.html'
        })
        .state('misc.success', {
            url: '/success',
            templateUrl: templateBase + 'misc/misc.success.html'
        })
        // Misc/Users ----------------------------------------------------
        .state('users', {
            url: '/users',
            templateUrl: templateBase + 'misc/users/users.html'
        })
        .state('users.search', {
            url: '/',
            templateUrl: templateBase + 'misc/users/search/users.search.html',
            controller: returnCtrlAs('usersSearch')
        })
        .state('users.invitations', {
            url: '/invitations',
            templateUrl: templateBase + 'misc/invitations/search/users.invitations.search.html',
            controller: returnCtrlAs('usersInvitations')
        })
        .state('users.invite', {
            url: '/invite',
            templateUrl: templateBase + 'misc/invitations/invite/users.invite.html',
            controller: returnCtrlAs('usersInvite')
        })
        .state('users.activate', {
            url: '/activate/:id',
            templateUrl: templateBase + 'users/users.activate/users.activate.html',
            controller: returnCtrlAs('usersActivate')
        })
        // Empty ---------------------------------------------------------
        .state('empty', {
            url: '/empty',
            templateUrl: templateBase + 'empty/empty.html',
            controller: returnCtrlAs('empty')
        });

    // $locationProvider.html5Mode(true);

    //fixes infinite digest loop with ui-router (do NOT change unless absolutely required)
    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get('$state');
      $state.go('welcome');
    });

    if(appConfig.languages){
        $cuiI18nProvider.setLocaleCodesAndNames(appConfig.languages);
        var languageKeys=Object.keys($cuiI18nProvider.getLocaleCodesAndNames());

        var returnRegisterAvailableLanguageKeys=function(){
            var object={'*':languageKeys[0]}; // set unknown languages to reroute to prefered language
            languageKeys.forEach(function(languageKey){
                object[languageKey+'*'] = languageKey; //redirect language keys such as en_US to en or en-US to en
            });
            return object;
        };

        $translateProvider
        .useLoader('LocaleLoader',{
            url:'bower_components/cui-i18n/dist/cui-i18n/angular-translate/',
            prefix:'locale-',
            suffix:'.json'
        })
        .registerAvailableLanguageKeys(languageKeys,returnRegisterAvailableLanguageKeys())
        .uniformLanguageTag('java')
        .determinePreferredLanguage()
        .fallbackLanguage(languageKeys);

        $cuiI18nProvider.setLocalePreference(languageKeys);
    }

    if(appConfig.iconSets){
        appConfig.iconSets.forEach(function(iconSet){
            $cuiIconProvider.iconSet(iconSet.name,iconSet.path,iconSet.defaultViewBox || null);
        })
    }
}]);

angular.module('app')
.run(['LocaleService','$rootScope','$state','$http','$templateCache','$cuiI18n','User','cui.authorization.routing','Menu','API','$cuiIcon',
    function(LocaleService,$rootScope,$state,$http,$templateCache,$cuiI18n,User,routing,Menu,API,$cuiIcon){
    //add more locales here
    var languageNameObject=$cuiI18n.getLocaleCodesAndNames();
    for(var LanguageKey in languageNameObject){
        LocaleService.setLocales(LanguageKey,languageNameObject[LanguageKey]);
    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        // cui Auth
        API.handleCovAuthResponse(event,toState,toParams,fromState,fromParams);
        // determines if user is able to access the particular route we're navigation to
        routing($rootScope, $state, toState, toParams, fromState, fromParams, User.getEntitlements());
        // for menu handling
        Menu.handleStateChange(toState.menu);
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) { // this is for base.goBack()
        $state.previous = {};
        $state.previous.name = fromState;
        $state.previous.params = fromParams;
    });

    angular.forEach($cuiIcon.getIconSets(),function(iconSettings,namespace){
        $http.get(iconSettings.path,{
            cache: $templateCache
        });
    });
}]);
