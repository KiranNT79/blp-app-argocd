<template>
    <div className="mx-6 mt-6 dashboard-container">
        <div class="info-container">
            <h1>{{ $t('campaigns.title') }}</h1>
            <div v-if="dlmData !== null" class="mt-6">
                <TableComponent :columnDef="columnDef" :data="dlmData" />
            </div>
        </div>
    </div>
</template>

<script>
import { format } from "date-fns";
import TableComponent from '../components/TableComponent.vue';

export default {
    name: "AppCampaigns",
    components: {
        TableComponent
    },
    data() {
        return {
            dlmData: null,
            columnDef: [
                { field: 'brand', name: 'Brand' },
                { field: 'title', name: 'Title' },
                { field: 'type', name: 'Technology' },
                { field: 'state', name: 'Status' },
                { field: 'changedAt', name: 'Last Modified' },
                { field: 'changedBy', name: 'Last Modified By' },
            ]
        }
    },
    mounted() {

        const fetchDLM = async () => {
            try {
                let response = null;
                response = await fetch('/api/dataloadmanagement/campaigns');
                response = await response.json();
                if (response?.status && response?.status != 200) {
                    console.log("something went wrong", response);
                    this.dlmData = [];
                }

                if (response.length) {
                    const data = response.map(row => {
                        const date = row.changedAt;
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        const newRow = {
                            ...row,
                            'changedAt': formattedDate
                        };
                        return newRow;
                    });
                    this.dlmData = data;

                } else {
                    this.dlmData = [];
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchDLM();
    }
}
</script>

<style lang="scss">
@import 'modern-normalize/modern-normalize.css';
@import 'css-pro-layout/dist/scss/css-pro-layout.scss';

.info-container {
    flex: 5;
    padding: 2em;
    flex-wrap: wrap;
    margin-top: 20px;
}

.dashboard-container {
    height: 78lvh;
}
</style>
