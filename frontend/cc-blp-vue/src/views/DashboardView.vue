<template>
    <div class="mx-6 mt-6 dashboard-container">
        <div class="flex flex-row user-details space-between">
            <div>
                <img class="logo" src="@/assets/logo.png" alt="Vue Logo">
                <div class="user-info">{{ $t('user', { name: username }) }}</div>
                <br />
                <div class="welcome-text">{{ $t('welcome', { tech: 'VueJs' }) }}</div>
            </div>
            <div>
                <RouterLink :to="CAMPAIGNS">{{ $t('navigation.goto', { pageName: $t('campaigns.title') })  }}</RouterLink>
                <br/>
                <RouterLink :to="SWPROJECTS">{{ $t('navigation.goto', { pageName: $t('swProjects.title') })  }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { firstValueFrom } from 'rxjs';
import { initUser, getUser$ } from '@dlcm/cc-ui-utils-store-user';
import { defineComponent } from "vue";
import RouterLink from 'vue-router';
import { CAMPAIGNS, SWPROJECTS } from '@/constants/constants'

export default defineComponent({
    name: "AppDashboard",
    data() {
        return {
            username: null,
            CAMPAIGNS,
            SWPROJECTS
        }
    },
    mounted() {
        async function initiateUser() {
            await initUser();
            fetchUser();
        }
        const fetchUser = async () => {
            const user = await firstValueFrom(getUser$);
            if (user === false) {
                initiateUser();
            }
            this.username = JSON.parse(user).name;
        };
        fetchUser();
    }
})
</script>

<style lang="scss">
@import 'modern-normalize/modern-normalize.css';
@import 'css-pro-layout/dist/scss/css-pro-layout.scss';

.flex {
    display: flex;
}

.flex-row {
    @extend .flex;
    flex-direction: row;
}

.flex-column {
    @extend .flex;
    flex-direction: column;
}

.dashboard-container {
    height: 78lvh;
}

.space-between {
    justify-content: space-between;
}

.user-details {
    padding: 1em;
    flex: 2;
    color: #2e218e;
    font-size: 30px;
    font-family: var(--dlcm-font-medium);
    font-weight: 400;

    .locale-changer{
        font-size: 12px;
        font-family: var(--dlcm-font-regular);
        font-weight: 300;
    }

    .logo{
        height: 150px;
        width: 150px;
    }

    .user-info {
        color: #170e5d;
        font-weight: 500;
        font-size: 48px;
        line-height: 56px;
    }

    .welcome-text {
        font-size: 24px;
        line-height: 32px;
        font-weight: 300;
        font-family: var(--dlcm-font-regular);
        font-weight: 400;
    }
}
</style>
