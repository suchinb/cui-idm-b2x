angular.module('organization')
.controller('personRequestCtrl', function(DataStorage, Loader, PersonRequest, ServicePackage, $state, $stateParams) {
    'use strict'

    const personRequest = this
    const userId = $stateParams.userID
    const organizationId = $stateParams.orgID

    // ON LOAD START ---------------------------------------------------------------------------------

    Loader.onFor('personRequest.init')

    PersonRequest.getPersonRegistrationRequestData(userId, organizationId)
    .then(res => {
        personRequest.request = res
        Loader.offFor('personRequest.init')
    })

    ServicePackage.getAllUserPendingPackageData(userId)
    .then(res => {
        personRequest.packages = res
    })

    // ON LOAD END -----------------------------------------------------------------------------------

    // ON CLICK START --------------------------------------------------------------------------------

    personRequest.reviewApprovals = () => {
        DataStorage.replaceDataThatMatches('userPersonRequest', { userId }, { userId, requestData: personRequest })
        $state.go('organization.requests.personRequestReview', { userID: userId, orgID: organizationId })
    }

    // ON CLICK END ----------------------------------------------------------------------------------

})
